import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {colors, radii} from '../theme';
import {useCompactLayout} from '../utils/layout';

type GradientButtonProps = {
  label: string;
  emoji?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function GradientButton({label, emoji, onPress, style}: GradientButtonProps) {
  const {isCompact} = useCompactLayout();

  return (
    <Pressable onPress={onPress} style={({pressed}) => [pressed && styles.pressed, style]}>
      <View
        style={[
          styles.button,
          isCompact && styles.buttonCompact,
        ]}>
        <View style={styles.content}>
          {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
          <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
            {label}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 52,
    borderRadius: radii.md,
    backgroundColor: colors.accentDeep,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    shadowColor: colors.accent,
    shadowOpacity: 0.32,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 8},
    elevation: 4,
  },
  buttonCompact: {
    minHeight: 48,
    paddingHorizontal: 14,
  },
  content: {
    width: '100%',
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 18,
    lineHeight: 20,
    includeFontPadding: false,
    textAlign: 'center',
  },
  text: {
    flexShrink: 1,
    flexGrow: 0,
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    includeFontPadding: false,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.82,
    transform: [{scale: 0.985}],
  },
});
