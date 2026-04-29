import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {storageKeys} from '../theme';

type SavedContextValue = {
  ready: boolean;
  savedIds: string[];
  savedSet: Set<string>;
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => Promise<void>;
  saveMany: (ids: string[]) => Promise<void>;
  removeSaved: (id: string) => Promise<void>;
  clearSaved: () => Promise<void>;
};

const SavedContext = createContext<SavedContextValue | undefined>(undefined);

export function SavedProvider({children}: PropsWithChildren) {
  const [ready, setReady] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;

    async function loadSaved() {
      try {
        const value = await AsyncStorage.getItem(storageKeys.savedLocations);
        const parsed = value ? JSON.parse(value) : [];
        if (mounted && Array.isArray(parsed)) {
          setSavedIds(parsed.filter(item => typeof item === 'string'));
        }
      } finally {
        if (mounted) {
          setReady(true);
        }
      }
    }

    loadSaved();

    return () => {
      mounted = false;
    };
  }, []);

  const persist = useCallback(async (nextIds: string[]) => {
    setSavedIds(nextIds);
    await AsyncStorage.setItem(storageKeys.savedLocations, JSON.stringify(nextIds));
  }, []);

  const savedSet = useMemo(() => new Set(savedIds), [savedIds]);

  const isSaved = useCallback(
    (id: string) => savedSet.has(id),
    [savedSet],
  );

  const toggleSaved = useCallback(
    async (id: string) => {
      const nextIds = savedSet.has(id)
        ? savedIds.filter(savedId => savedId !== id)
        : [id, ...savedIds];
      await persist(nextIds);
    },
    [persist, savedIds, savedSet],
  );

  const saveMany = useCallback(
    async (ids: string[]) => {
      const nextIds = [
        ...ids.filter(id => !savedSet.has(id)),
        ...savedIds,
      ];
      await persist(nextIds);
    },
    [persist, savedIds, savedSet],
  );

  const removeSaved = useCallback(
    async (id: string) => {
      await persist(savedIds.filter(savedId => savedId !== id));
    },
    [persist, savedIds],
  );

  const clearSaved = useCallback(async () => {
    await persist([]);
  }, [persist]);

  const value = useMemo(
    () => ({
      ready,
      savedIds,
      savedSet,
      isSaved,
      toggleSaved,
      saveMany,
      removeSaved,
      clearSaved,
    }),
    [clearSaved, isSaved, ready, removeSaved, saveMany, savedIds, savedSet, toggleSaved],
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved() {
  const context = useContext(SavedContext);

  if (!context) {
    throw new Error('useSaved must be used inside SavedProvider');
  }

  return context;
}
