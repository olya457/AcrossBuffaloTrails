import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GradientButton} from '../components/GradientButton';
import {LocationCard} from '../components/LocationCard';
import {Screen} from '../components/Screen';
import {useSaved} from '../context/SavedContext';
import {locationById} from '../data/locations';
import {colors, radii} from '../theme';
import type {SavedStackParamList} from '../types';
import {useCompactLayout} from '../utils/layout';

type SavedScreenProps = NativeStackScreenProps<SavedStackParamList, 'SavedHome'>;

export function SavedScreen({navigation}: SavedScreenProps) {
  const {isCompact} = useCompactLayout();
  const {savedIds, isSaved, toggleSaved} = useSaved();
  const savedLocations = savedIds.map(id => locationById[id]).filter(Boolean);

  const exploreTrails = () => {
    navigation.getParent()?.navigate('TrailsTab');
  };

  const openMap = (locationId: string) => {
    navigation.getParent()?.navigate('MapTab', {
      screen: 'MapHome',
      params: {selectedLocationId: locationId},
    });
  };

  return (
    <Screen scroll>
      <Text style={styles.eyebrow}>COLLECTION</Text>
      <Text style={[styles.title, isCompact && styles.titleCompact]}>Saved Places</Text>
      {savedLocations.length ? (
        <>
          <Text style={[styles.subtitle, isCompact && styles.subtitleCompact]}>
            {savedLocations.length} {savedLocations.length === 1 ? 'location' : 'locations'} saved
          </Text>
          <View style={[styles.list, isCompact && styles.listCompact]}>
            {savedLocations.map(location => (
              <LocationCard
                key={location.id}
                compact
                location={location}
                saved={isSaved(location.id)}
                onPress={() => navigation.navigate('SavedLocationDetail', {locationId: location.id})}
                onMap={() => openMap(location.id)}
                onToggleSaved={() => toggleSaved(location.id)}
              />
            ))}
          </View>
        </>
      ) : (
        <View style={[styles.empty, isCompact && styles.emptyCompact]}>
          <View style={[styles.emptyIcon, isCompact && styles.emptyIconCompact]}>
            <Text style={[styles.emptyEmoji, isCompact && styles.emptyEmojiCompact]}>🧭</Text>
          </View>
          <Text style={[styles.emptyTitle, isCompact && styles.emptyTitleCompact]}>No saved places yet</Text>
          <Text style={[styles.emptyText, isCompact && styles.emptyTextCompact]}>
            Explore the trails and save your favorite locations to build a personal buffalo route.
          </Text>
          <GradientButton
            label="Explore Trails"
            onPress={exploreTrails}
            style={[styles.emptyButton, isCompact && styles.emptyButtonCompact]}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 31,
    fontWeight: '900',
    includeFontPadding: false,
  },
  titleCompact: {
    fontSize: 28,
  },
  subtitle: {
    color: colors.mutedDark,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 12,
  },
  subtitleCompact: {
    fontSize: 12,
    marginTop: 10,
  },
  list: {
    marginTop: 28,
  },
  listCompact: {
    marginTop: 20,
  },
  empty: {
    flex: 1,
    minHeight: 510,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCompact: {
    minHeight: 420,
  },
  emptyIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 179, 44, 0.28)',
    backgroundColor: 'rgba(255, 179, 44, 0.08)',
    marginBottom: 30,
  },
  emptyIconCompact: {
    width: 68,
    height: 68,
    borderRadius: 34,
    marginBottom: 22,
  },
  emptyEmoji: {
    fontSize: 34,
  },
  emptyEmojiCompact: {
    fontSize: 28,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyTitleCompact: {
    fontSize: 20,
  },
  emptyText: {
    color: colors.mutedDark,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 14,
    maxWidth: 280,
  },
  emptyTextCompact: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
    maxWidth: 250,
  },
  emptyButton: {
    width: 184,
    marginTop: 28,
    borderRadius: radii.md,
  },
  emptyButtonCompact: {
    width: 168,
    marginTop: 22,
  },
});
