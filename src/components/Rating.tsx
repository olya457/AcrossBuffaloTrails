import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';

type RatingProps = {
  value: number;
  label?: string;
};

export function Rating({value, label}: RatingProps) {
  const stars = Array.from({length: 5}, (_, index) =>
    index < Math.round(value) ? '★' : '☆',
  ).join('');

  return (
    <View style={styles.root}>
      <Text style={styles.stars}>{stars}</Text>
      <Text style={styles.label}>
        {value.toFixed(1)}
        {label ? ` · ${label}` : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stars: {
    color: colors.gold,
    fontSize: 14,
    includeFontPadding: false,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600',
  },
});
