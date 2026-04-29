import AsyncStorage from '@react-native-async-storage/async-storage';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GradientButton} from '../components/GradientButton';
import {IconButton} from '../components/IconButton';
import {Screen} from '../components/Screen';
import {crosswordWords} from '../data/games';
import {colors, radii, storageKeys} from '../theme';
import type {PickStackParamList} from '../types';
import {useCompactLayout} from '../utils/layout';

type CrosswordGameProps = NativeStackScreenProps<PickStackParamList, 'CrosswordGame'>;

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

function normalizeAnswer(value: string) {
  return value.replace(/[^a-z]/gi, '').toUpperCase();
}

export function CrosswordGameScreen({navigation}: CrosswordGameProps) {
  const {isCompact} = useCompactLayout();
  const [wordIndex, setWordIndex] = useState(0);
  const [input, setInput] = useState('');
  const [solved, setSolved] = useState(false);
  const completed = wordIndex >= crosswordWords.length;
  const word = crosswordWords[Math.min(wordIndex, crosswordWords.length - 1)];
  const normalizedInput = normalizeAnswer(input);
  const fullAndWrong = normalizedInput.length === word.answer.length && normalizedInput !== word.answer;
  const progressPercent = useMemo(
    () => Math.round((wordIndex / crosswordWords.length) * 100),
    [wordIndex],
  );

  useEffect(() => {
    async function loadProgress() {
      const value = await AsyncStorage.getItem(storageKeys.crosswordProgress);

      if (!value) {
        return;
      }

      const parsed = JSON.parse(value);
      setWordIndex(Math.min(parsed.wordIndex ?? 0, crosswordWords.length));
    }

    loadProgress();
  }, []);

  const persistIndex = async (nextIndex: number) => {
    setWordIndex(nextIndex);
    await AsyncStorage.setItem(
      storageKeys.crosswordProgress,
      JSON.stringify({wordIndex: nextIndex}),
    );
  };

  const handleKeyPress = (letter: string) => {
    if (completed || solved) {
      return;
    }

    if (normalizedInput.length >= word.answer.length) {
      return;
    }

    const nextInput = `${normalizedInput}${letter}`;
    setInput(nextInput);

    if (nextInput === word.answer) {
      setSolved(true);
      setTimeout(() => {
        setInput('');
        setSolved(false);
        persistIndex(wordIndex + 1);
      }, 650);
    }
  };

  const handleDelete = () => {
    if (completed || solved || !normalizedInput.length) {
      return;
    }

    setInput(normalizedInput.slice(0, -1));
  };

  const handleClear = () => {
    if (completed || solved || !normalizedInput.length) {
      return;
    }

    setInput('');
  };

  const resetCrossword = async () => {
    setInput('');
    setSolved(false);
    await persistIndex(0);
  };

  const cells = word.answer.split('');

  return (
    <Screen scroll>
      <View style={[styles.header, isCompact && styles.headerCompact]}>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>TRAIL CROSSWORD</Text>
          <Text style={[styles.title, isCompact && styles.titleCompact]}>
            {completed ? 'Complete' : `Word ${wordIndex + 1}`}
          </Text>
          <Text style={[styles.subtitle, isCompact && styles.subtitleCompact]}>
            {completed ? 'You solved all 50 words.' : `${wordIndex + 1} of ${crosswordWords.length} · ${word.hint}`}
          </Text>
        </View>
        <IconButton emoji="⬅️" onPress={() => navigation.goBack()} label="Back" />
      </View>

      <View style={[styles.progressTrack, isCompact && styles.progressTrackCompact]}>
        <View style={[styles.progressFill, {width: `${progressPercent}%`}]} />
      </View>
      <Text style={[styles.progressText, isCompact && styles.progressTextCompact]}>{progressPercent}% complete</Text>

      {completed ? (
        <View style={[styles.card, isCompact && styles.cardCompact]}>
          <Text style={[styles.completeTitle, isCompact && styles.completeTitleCompact]}>Every clue is solved</Text>
          <Text style={[styles.completeText, isCompact && styles.completeTextCompact]}>
            The crossword covered wildlife, landmarks, states, parks, sports identity, and route vocabulary.
          </Text>
          <GradientButton label="Restart Crossword" onPress={resetCrossword} style={[styles.restartButton, isCompact && styles.restartButtonCompact]} />
        </View>
      ) : (
        <View style={[styles.card, isCompact && styles.cardCompact]}>
          <Text style={styles.clueLabel}>CLUE</Text>
          <Text style={[styles.clue, isCompact && styles.clueCompact]}>{word.clue}</Text>

          <View style={[styles.cells, isCompact && styles.cellsCompact]}>
            {cells.map((letter, index) => (
              <View
                key={`${letter}-${index}`}
                style={[
                  styles.cell,
                  isCompact && styles.cellCompact,
                  Boolean(normalizedInput[index]) && styles.cellFilled,
                  index === normalizedInput.length && !fullAndWrong && !solved && styles.cellActive,
                  fullAndWrong && styles.cellWrong,
                  solved && styles.cellSolved,
                ]}>
                <Text style={[styles.cellText, isCompact && styles.cellTextCompact]}>
                  {normalizedInput[index] ?? ''}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.keyboard, isCompact && styles.keyboardCompact]}>
            {keyboardRows.map((row, rowIndex) => (
              <View
                key={row.join('')}
                style={[
                  styles.keyboardRow,
                  rowIndex === 1 && styles.keyboardRowMiddle,
                  rowIndex === 2 && styles.keyboardRowBottom,
                ]}>
                {row.map(letter => (
                  <Pressable
                    key={letter}
                    onPress={() => handleKeyPress(letter)}
                    style={({pressed}) => [
                      styles.key,
                      isCompact && styles.keyCompact,
                      normalizedInput.length >= word.answer.length && styles.keyDisabled,
                      pressed && styles.pressed,
                    ]}>
                    <Text style={[styles.keyText, isCompact && styles.keyTextCompact]}>{letter}</Text>
                  </Pressable>
                ))}
              </View>
            ))}
            <View style={[styles.keyboardTools, isCompact && styles.keyboardToolsCompact]}>
              <Pressable
                onPress={handleDelete}
                style={({pressed}) => [
                  styles.toolKey,
                  !normalizedInput.length && styles.keyDisabled,
                  pressed && styles.pressed,
                ]}>
                <Text style={styles.toolText}>Delete</Text>
              </Pressable>
              <Pressable
                onPress={handleClear}
                style={({pressed}) => [
                  styles.toolKey,
                  !normalizedInput.length && styles.keyDisabled,
                  pressed && styles.pressed,
                ]}>
                <Text style={styles.toolText}>Clear</Text>
              </Pressable>
            </View>
          </View>

          <Text style={[styles.status, isCompact && styles.statusCompact, solved && styles.statusSolved, fullAndWrong && styles.statusWrong]}>
            {solved
              ? 'Correct. Loading next word...'
              : fullAndWrong
                ? 'Not quite. Delete a letter or clear the word.'
                : 'Tap letters to fill the cells.'}
          </Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerCompact: {
    gap: 10,
  },
  headerText: {
    flex: 1,
  },
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
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  subtitleCompact: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  progressTrack: {
    height: 8,
    borderRadius: 99,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 22,
  },
  progressTrackCompact: {
    marginTop: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.sage,
  },
  progressText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 9,
    marginBottom: 16,
  },
  progressTextCompact: {
    fontSize: 11,
    marginTop: 7,
    marginBottom: 12,
  },
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
  },
  cardCompact: {
    padding: 14,
  },
  clueLabel: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 8,
  },
  clue: {
    color: colors.text,
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '900',
  },
  clueCompact: {
    fontSize: 19,
    lineHeight: 25,
  },
  cells: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 20,
  },
  cellsCompact: {
    gap: 5,
    marginTop: 16,
  },
  cell: {
    width: 34,
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellCompact: {
    width: 29,
    height: 36,
    borderRadius: 7,
  },
  cellSolved: {
    borderColor: colors.sage,
    backgroundColor: 'rgba(100, 194, 123, 0.18)',
  },
  cellFilled: {
    borderColor: 'rgba(255, 195, 78, 0.5)',
  },
  cellActive: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(255, 179, 44, 0.12)',
  },
  cellWrong: {
    borderColor: colors.accentDeep,
    backgroundColor: 'rgba(255, 122, 11, 0.14)',
  },
  cellText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  cellTextCompact: {
    fontSize: 16,
  },
  keyboard: {
    marginTop: 18,
  },
  keyboardCompact: {
    marginTop: 14,
  },
  keyboardRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 7,
  },
  keyboardRowMiddle: {
    paddingHorizontal: 13,
  },
  keyboardRowBottom: {
    paddingHorizontal: 42,
  },
  key: {
    flex: 1,
    minHeight: 38,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  keyCompact: {
    minHeight: 34,
    borderRadius: 8,
  },
  keyDisabled: {
    opacity: 0.42,
  },
  keyText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  keyTextCompact: {
    fontSize: 13,
  },
  keyboardTools: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  keyboardToolsCompact: {
    gap: 7,
  },
  toolKey: {
    flex: 1,
    minHeight: 42,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 179, 44, 0.12)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  toolText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  status: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 12,
    fontWeight: '800',
  },
  statusCompact: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },
  statusSolved: {
    color: colors.sage,
  },
  statusWrong: {
    color: colors.gold,
  },
  completeTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  completeTitleCompact: {
    fontSize: 21,
  },
  completeText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  completeTextCompact: {
    fontSize: 13,
    lineHeight: 20,
  },
  restartButton: {
    marginTop: 18,
  },
  restartButtonCompact: {
    marginTop: 14,
  },
  pressed: {
    opacity: 0.78,
    transform: [{scale: 0.97}],
  },
});
