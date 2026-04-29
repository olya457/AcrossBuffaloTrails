import AsyncStorage from '@react-native-async-storage/async-storage';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GradientButton} from '../components/GradientButton';
import {IconButton} from '../components/IconButton';
import {Screen} from '../components/Screen';
import {quizLevels} from '../data/games';
import {colors, radii, storageKeys} from '../theme';
import type {PickStackParamList} from '../types';
import {useCompactLayout} from '../utils/layout';

type QuizGameProps = NativeStackScreenProps<PickStackParamList, 'QuizGame'>;

type QuizProgress = {
  levelIndex: number;
  questionIndex: number;
  correct: number;
  roundComplete: boolean;
};

export function QuizGameScreen({navigation}: QuizGameProps) {
  const {isCompact} = useCompactLayout();
  const [progress, setProgress] = useState<QuizProgress>({
    levelIndex: 0,
    questionIndex: 0,
    correct: 0,
    roundComplete: false,
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answeredCorrect, setAnsweredCorrect] = useState<boolean | null>(null);
  const completed = progress.levelIndex >= quizLevels.length;
  const level = quizLevels[Math.min(progress.levelIndex, quizLevels.length - 1)];
  const question = level.questions[Math.min(progress.questionIndex, level.questions.length - 1)];
  const totalAnswered = Math.min(
    progress.levelIndex * 5 + (progress.roundComplete ? level.questions.length : progress.questionIndex),
    quizLevels.length * 5,
  );
  const progressPercent = useMemo(
    () => Math.round((totalAnswered / (quizLevels.length * 5)) * 100),
    [totalAnswered],
  );
  const roundComplete = !completed && progress.roundComplete;
  const passedRound = progress.correct > 4;

  useEffect(() => {
    async function loadProgress() {
      const value = await AsyncStorage.getItem(storageKeys.quizProgress);

      if (!value) {
        return;
      }

      const parsed = JSON.parse(value);
      setProgress({
        levelIndex: Math.min(parsed.levelIndex ?? 0, quizLevels.length),
        questionIndex: Math.min(parsed.questionIndex ?? 0, 4),
        correct: parsed.correct ?? 0,
        roundComplete: Boolean(parsed.roundComplete),
      });
    }

    loadProgress();
  }, []);

  const persistProgress = async (nextProgress: QuizProgress) => {
    setProgress(nextProgress);
    await AsyncStorage.setItem(storageKeys.quizProgress, JSON.stringify(nextProgress));
  };

  const chooseOption = (optionIndex: number) => {
    if (selectedIndex !== null || completed || roundComplete) {
      return;
    }

    const correct = optionIndex === question.answerIndex;
    const nextCorrect = progress.correct + (correct ? 1 : 0);
    setSelectedIndex(optionIndex);
    setAnsweredCorrect(correct);

    setTimeout(() => {
      const nextQuestionIndex = progress.questionIndex + 1;
      const nextProgress =
        nextQuestionIndex >= level.questions.length
          ? {
              levelIndex: progress.levelIndex,
              questionIndex: level.questions.length - 1,
              correct: nextCorrect,
              roundComplete: true,
            }
          : {
              levelIndex: progress.levelIndex,
              questionIndex: nextQuestionIndex,
              correct: nextCorrect,
              roundComplete: false,
            };

      setSelectedIndex(null);
      setAnsweredCorrect(null);
      persistProgress(nextProgress);
    }, 850);
  };

  const resetQuiz = async () => {
    const nextProgress = {levelIndex: 0, questionIndex: 0, correct: 0, roundComplete: false};
    await persistProgress(nextProgress);
  };

  const nextLevel = async () => {
    const nextProgress = {
      levelIndex: progress.levelIndex + 1,
      questionIndex: 0,
      correct: 0,
      roundComplete: false,
    };
    await persistProgress(nextProgress);
  };

  const tryAgain = async () => {
    const nextProgress = {
      levelIndex: progress.levelIndex,
      questionIndex: 0,
      correct: 0,
      roundComplete: false,
    };
    await persistProgress(nextProgress);
  };

  return (
    <Screen scroll>
      <View style={[styles.header, isCompact && styles.headerCompact]}>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>BUFFALO QUIZ</Text>
          <Text style={[styles.title, isCompact && styles.titleCompact]}>
            {completed ? 'Quiz Complete' : roundComplete ? `Level ${level.level} Result` : `Level ${level.level}`}
          </Text>
          <Text style={[styles.subtitle, isCompact && styles.subtitleCompact]}>
            {completed
              ? 'You finished all 30 levels.'
              : roundComplete
                ? `${level.title} · ${progress.correct} of 5 correct`
                : `${level.title} · Question ${progress.questionIndex + 1} of 5`}
          </Text>
        </View>
        <IconButton emoji="⬅️" onPress={() => navigation.goBack()} label="Back" />
      </View>

      <View style={[styles.progressTrack, isCompact && styles.progressTrackCompact]}>
        <View style={[styles.progressFill, {width: `${progressPercent}%`}]} />
      </View>
      <Text style={[styles.progressText, isCompact && styles.progressTextCompact]}>{progressPercent}% complete</Text>

      {completed ? (
        <View style={[styles.completeCard, isCompact && styles.completeCardCompact]}>
          <Text style={[styles.completeTitle, isCompact && styles.completeTitleCompact]}>All levels cleared</Text>
          <Text style={[styles.completeText, isCompact && styles.completeTextCompact]}>
            The full quiz has 150 questions across monuments, wildlife routes, rodeo culture, sports identity, and travel stories.
          </Text>
          <GradientButton label="Restart Quiz" onPress={resetQuiz} style={[styles.restartButton, isCompact && styles.restartButtonCompact]} />
        </View>
      ) : roundComplete ? (
        <View style={[styles.completeCard, isCompact && styles.completeCardCompact]}>
          <Text style={[styles.completeTitle, isCompact && styles.completeTitleCompact]}>
            {passedRound ? 'Round cleared' : 'Try this round again'}
          </Text>
          <Text style={[styles.scoreText, isCompact && styles.scoreTextCompact]}>
            {progress.correct}/5
          </Text>
          <Text style={[styles.completeText, isCompact && styles.completeTextCompact]}>
            {passedRound
              ? 'Great result. The next level is unlocked.'
              : 'Score 5 correct answers to unlock the next level.'}
          </Text>
          <GradientButton
            label={passedRound ? 'Next Level' : 'Try Again'}
            onPress={passedRound ? nextLevel : tryAgain}
            style={[styles.restartButton, isCompact && styles.restartButtonCompact]}
          />
        </View>
      ) : (
        <View style={[styles.questionCard, isCompact && styles.questionCardCompact]}>
          <Text style={[styles.questionText, isCompact && styles.questionTextCompact]}>{question.prompt}</Text>
          <View style={[styles.options, isCompact && styles.optionsCompact]}>
            {question.options.map((option, index) => {
              const selected = selectedIndex === index;
              const correct = index === question.answerIndex;
              const showResult = selectedIndex !== null;

              return (
                <Pressable
                  key={option}
                  onPress={() => chooseOption(index)}
                  style={({pressed}) => [
                    styles.option,
                    isCompact && styles.optionCompact,
                    selected && styles.optionSelected,
                    showResult && correct && styles.optionCorrect,
                    showResult && selected && !correct && styles.optionWrong,
                    pressed && styles.pressed,
                  ]}>
                  <Text style={[styles.optionText, isCompact && styles.optionTextCompact]}>{option}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={[styles.feedback, isCompact && styles.feedbackCompact]}>
            <Text style={[styles.feedbackText, isCompact && styles.feedbackTextCompact, answeredCorrect === false && styles.feedbackWrong]}>
              {answeredCorrect === null
                ? 'Choose one answer'
                : answeredCorrect
                  ? question.detail
                  : `Correct answer: ${question.options[question.answerIndex]}`}
            </Text>
          </View>
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
    backgroundColor: colors.accent,
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
  questionCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
  },
  questionCardCompact: {
    padding: 14,
  },
  questionText: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
  },
  questionTextCompact: {
    fontSize: 19,
    lineHeight: 25,
  },
  options: {
    gap: 10,
    marginTop: 18,
  },
  optionsCompact: {
    gap: 8,
    marginTop: 14,
  },
  option: {
    minHeight: 54,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  optionCompact: {
    minHeight: 48,
    paddingHorizontal: 12,
  },
  optionSelected: {
    borderColor: colors.gold,
  },
  optionCorrect: {
    backgroundColor: 'rgba(100, 194, 123, 0.22)',
    borderColor: colors.sage,
  },
  optionWrong: {
    backgroundColor: 'rgba(255, 122, 11, 0.18)',
    borderColor: colors.accentDeep,
  },
  optionText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  optionTextCompact: {
    fontSize: 14,
    lineHeight: 19,
  },
  feedback: {
    minHeight: 42,
    justifyContent: 'center',
    marginTop: 12,
  },
  feedbackCompact: {
    minHeight: 34,
    marginTop: 10,
  },
  feedbackText: {
    color: colors.sage,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '800',
  },
  feedbackTextCompact: {
    fontSize: 12,
    lineHeight: 18,
  },
  feedbackWrong: {
    color: colors.gold,
  },
  completeCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 18,
  },
  completeCardCompact: {
    padding: 14,
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
  scoreText: {
    color: colors.gold,
    fontSize: 46,
    fontWeight: '900',
    marginTop: 12,
    includeFontPadding: false,
  },
  scoreTextCompact: {
    fontSize: 38,
    marginTop: 10,
  },
  restartButton: {
    marginTop: 18,
  },
  restartButtonCompact: {
    marginTop: 14,
  },
  pressed: {
    opacity: 0.82,
  },
});
