import {useIsFocused} from '@react-navigation/native';
import React, {PropsWithChildren, useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../theme';
import {
  getAndroidTopInset,
  getScreenBottomInset,
  useCompactLayout,
} from '../utils/layout';

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  withTabs?: boolean;
  noTopPadding?: boolean;
  noHorizontalPadding?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}>;

export function Screen({
  children,
  scroll,
  withTabs = true,
  noTopPadding,
  noHorizontalPadding,
  style,
  contentContainerStyle,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const {isCompact} = useCompactLayout();
  const isFocused = useIsFocused();
  const appear = useRef(new Animated.Value(0)).current;
  const paddingTop = noTopPadding ? 0 : Math.max(getAndroidTopInset(insets) - (isCompact ? 4 : 0), 8);
  const paddingBottom = withTabs ? getScreenBottomInset(insets) : insets.bottom + 24;
  const horizontal = noHorizontalPadding ? 0 : isCompact ? 16 : 20;
  const contentStyle = [
    styles.content,
    {
      paddingTop,
      paddingBottom,
      paddingHorizontal: horizontal,
    },
    contentContainerStyle,
  ];
  const animatedContentStyle = [
    contentStyle,
    {
      opacity: appear,
      transform: [
        {
          translateY: appear.interpolate({
            inputRange: [0, 1],
            outputRange: [18, 0],
          }),
        },
      ],
    },
  ];

  useEffect(() => {
    if (!isFocused) {
      appear.setValue(0);
      return;
    }

    Animated.timing(appear, {
      toValue: 1,
      duration: 420,
      delay: 35,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [appear, isFocused]);

  if (scroll) {
    return (
      <ScrollView
        style={[styles.root, style]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={animatedContentStyle}>{children}</Animated.View>
      </ScrollView>
    );
  }

  return (
    <View style={[styles.root, style]}>
      <Animated.View style={animatedContentStyle}>{children}</Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
