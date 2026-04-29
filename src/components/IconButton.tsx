import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {colors, radii} from '../theme';
import {useCompactLayout} from '../utils/layout';

type IconButtonProps = {
  emoji: string;
  onPress: () => void;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  label?: string;
};

export function IconButton({emoji, onPress, active, style, label}: IconButtonProps) {
  const {isCompact} = useCompactLayout();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        isCompact && styles.buttonCompact,
        active && styles.active,
        pressed && styles.pressed,
        style,
      ]}>
      <Text style={[styles.emoji, isCompact && styles.emojiCompact]}>{emoji}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 46,
    height: 46,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  buttonCompact: {
    width: 42,
    height: 42,
  },
  active: {
    backgroundColor: 'rgba(255, 179, 44, 0.17)',
    borderColor: colors.gold,
  },
  emoji: {
    fontSize: 20,
  },
  emojiCompact: {
    fontSize: 18,
  },
  pressed: {
    opacity: 0.78,
    transform: [{scale: 0.96}],
  },
});
