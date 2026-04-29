import {Platform, useWindowDimensions} from 'react-native';
import type {EdgeInsets} from 'react-native-safe-area-context';

export const tabBarHeight = 72;

export const getBottomPanelGap = (insets: EdgeInsets) =>
  Platform.OS === 'ios' ? insets.bottom + 20 : 30;

export const getAndroidTopInset = (insets: EdgeInsets) =>
  Platform.OS === 'android' ? insets.top + 30 : insets.top + 12;

export const getScreenBottomInset = (insets: EdgeInsets) =>
  tabBarHeight + getBottomPanelGap(insets) + 18;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function useCompactLayout() {
  const {width, height} = useWindowDimensions();
  const isNarrow = width <= 380;
  const isShort = height <= 700;

  return {
    width,
    height,
    isCompact: isNarrow || isShort,
    isNarrow,
    isShort,
    isTiny: width <= 340 || height <= 620,
  };
}
