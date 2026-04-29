import AsyncStorage from '@react-native-async-storage/async-storage';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GradientButton} from '../components/GradientButton';
import {Screen} from '../components/Screen';
import {crosswordWords, quizLevels} from '../data/games';
import {colors, radii, storageKeys} from '../theme';
import type {PickStackParamList} from '../types';
import {useCompactLayout} from '../utils/layout';

type LearnHomeProps = NativeStackScreenProps<PickStackParamList, 'HornPickHome'>;

type QuizProgress = {
  levelIndex: number;
  questionIndex: number;
  roundComplete: boolean;
};

type CrosswordProgress = {
  wordIndex: number;
};

export function HornPickScreen({navigation}: LearnHomeProps) {
  const isFocused = useIsFocused();
  const {isCompact} = useCompactLayout();
  const [quizProgress, setQuizProgress] = useState<QuizProgress>({
    levelIndex: 0,
    questionIndex: 0,
    roundComplete: false,
  });
  const [crosswordProgress, setCrosswordProgress] = useState<CrosswordProgress>({
    wordIndex: 0,
  });

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    async function loadProgress() {
      const [quizValue, crosswordValue] = await Promise.all([
        AsyncStorage.getItem(storageKeys.quizProgress),
        AsyncStorage.getItem(storageKeys.crosswordProgress),
      ]);

      if (quizValue) {
        const parsed = JSON.parse(quizValue);
        setQuizProgress({
          levelIndex: Math.min(parsed.levelIndex ?? 0, quizLevels.length),
          questionIndex: Math.min(parsed.questionIndex ?? 0, 4),
          roundComplete: Boolean(parsed.roundComplete),
        });
      }

      if (crosswordValue) {
        const parsed = JSON.parse(crosswordValue);
        setCrosswordProgress({
          wordIndex: Math.min(parsed.wordIndex ?? 0, crosswordWords.length),
        });
      }
    }

    loadProgress();
  }, [isFocused]);

  const quizAnswered = Math.min(
    quizProgress.levelIndex * 5 + (quizProgress.roundComplete ? 5 : quizProgress.questionIndex),
    quizLevels.length * 5,
  );
  const quizPercent = Math.round((quizAnswered / (quizLevels.length * 5)) * 100);
  const crosswordPercent = Math.round(
    (Math.min(crosswordProgress.wordIndex, crosswordWords.length) / crosswordWords.length) * 100,
  );

  return (
    <Screen scroll>
      <Text style={styles.eyebrow}>BUFFALO LEARNING</Text>
      <Text style={[styles.title, isCompact && styles.titleCompact]}>Trail Challenges</Text>
      <Text style={[styles.subtitle, isCompact && styles.subtitleCompact]}>
        Learn the routes through quick quiz levels and one-word crossword clues. Progress is saved on this device.
      </Text>

      <Pressable
        onPress={() => navigation.navigate('QuizGame')}
        style={({pressed}) => [styles.gameCard, isCompact && styles.gameCardCompact, pressed && styles.pressed]}>
        <View style={[styles.cardTop, isCompact && styles.cardTopCompact]}>
          <View style={[styles.gameIcon, isCompact && styles.gameIconCompact]}>
            <Text style={[styles.gameIconText, isCompact && styles.gameIconTextCompact]}>?</Text>
          </View>
          <View style={styles.gameCopy}>
            <Text style={[styles.gameLabel, isCompact && styles.gameLabelCompact]}>30 LEVELS · 5 QUESTIONS EACH</Text>
            <Text style={[styles.gameTitle, isCompact && styles.gameTitleCompact]}>Buffalo Quiz</Text>
            <Text style={[styles.gameText, isCompact && styles.gameTextCompact]}>
              Answer route, wildlife, monument, and culture questions level by level.
            </Text>
          </View>
        </View>
        <View style={[styles.progressTrack, isCompact && styles.progressTrackCompact]}>
          <View style={[styles.progressFill, {width: `${quizPercent}%`}]} />
        </View>
        <Text style={[styles.progressText, isCompact && styles.progressTextCompact]}>
          {quizProgress.levelIndex >= quizLevels.length
            ? 'Quiz complete'
            : `Level ${Math.min(quizProgress.levelIndex + 1, quizLevels.length)} · ${quizProgress.roundComplete ? 'Result ready' : `Question ${quizProgress.questionIndex + 1}`}`} · {quizPercent}%
        </Text>
        <GradientButton
          label="Start Quiz"
          onPress={() => navigation.navigate('QuizGame')}
          style={[styles.gameButton, isCompact && styles.gameButtonCompact]}
        />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('CrosswordGame')}
        style={({pressed}) => [styles.gameCard, styles.secondCard, isCompact && styles.gameCardCompact, pressed && styles.pressed]}>
        <View style={[styles.cardTop, isCompact && styles.cardTopCompact]}>
          <View style={[styles.gameIcon, styles.crosswordIcon, isCompact && styles.gameIconCompact]}>
            <Text style={[styles.gameIconText, isCompact && styles.gameIconTextCompact]}>A</Text>
          </View>
          <View style={styles.gameCopy}>
            <Text style={[styles.gameLabel, isCompact && styles.gameLabelCompact]}>50 WORDS · ONE ANSWER AT A TIME</Text>
            <Text style={[styles.gameTitle, isCompact && styles.gameTitleCompact]}>Trail Crossword</Text>
            <Text style={[styles.gameText, isCompact && styles.gameTextCompact]}>
              Solve each clue, fill the word, and move automatically to the next challenge.
            </Text>
          </View>
        </View>
        <View style={[styles.progressTrack, isCompact && styles.progressTrackCompact]}>
          <View style={[styles.progressFill, styles.crosswordFill, {width: `${crosswordPercent}%`}]} />
        </View>
        <Text style={[styles.progressText, isCompact && styles.progressTextCompact]}>
          Word {Math.min(crosswordProgress.wordIndex + 1, crosswordWords.length)} of {crosswordWords.length} · {crosswordPercent}%
        </Text>
        <GradientButton
          label="Start Crossword"
          onPress={() => navigation.navigate('CrosswordGame')}
          style={[styles.gameButton, isCompact && styles.gameButtonCompact]}
        />
      </Pressable>
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
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 20,
  },
  subtitleCompact: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  gameCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
    marginBottom: 16,
  },
  gameCardCompact: {
    padding: 14,
    marginBottom: 12,
  },
  secondCard: {
    backgroundColor: colors.surface,
  },
  cardTop: {
    flexDirection: 'row',
    gap: 13,
  },
  cardTopCompact: {
    gap: 10,
  },
  gameIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 179, 44, 0.16)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  gameIconCompact: {
    width: 50,
    height: 50,
    borderRadius: 16,
  },
  crosswordIcon: {
    backgroundColor: 'rgba(100, 194, 123, 0.14)',
  },
  gameIconText: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    includeFontPadding: false,
  },
  gameIconTextCompact: {
    fontSize: 26,
  },
  gameCopy: {
    flex: 1,
  },
  gameLabel: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: '900',
    marginBottom: 7,
  },
  gameLabelCompact: {
    fontSize: 9,
    marginBottom: 5,
  },
  gameTitle: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '900',
  },
  gameTitleCompact: {
    fontSize: 21,
    lineHeight: 26,
  },
  gameText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },
  gameTextCompact: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  progressTrack: {
    height: 8,
    borderRadius: 99,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 16,
  },
  progressTrackCompact: {
    marginTop: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 99,
    backgroundColor: colors.accent,
  },
  crosswordFill: {
    backgroundColor: colors.sage,
  },
  progressText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 9,
  },
  progressTextCompact: {
    fontSize: 11,
    marginTop: 7,
  },
  gameButton: {
    marginTop: 14,
  },
  gameButtonCompact: {
    marginTop: 11,
  },
  pressed: {
    opacity: 0.82,
  },
});
