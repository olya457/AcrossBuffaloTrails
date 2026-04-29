import AsyncStorage from '@react-native-async-storage/async-storage';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GradientButton} from '../components/GradientButton';
import {appImages} from '../data/assets';
import {onboardingItems} from '../data/onboarding';
import {colors, radii, storageKeys} from '../theme';
import type {OnboardingItem, RootStackParamList} from '../types';
import {clamp} from '../utils/layout';

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

export function OnboardingScreen({navigation}: OnboardingScreenProps) {
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<OnboardingItem>>(null);
  const appear = useRef(new Animated.Value(0)).current;
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLast = index === onboardingItems.length - 1;
  const isCompact = width <= 380 || height <= 700;
  const heroHeight = clamp(height * (isCompact ? 0.52 : 0.57), isCompact ? 300 : 330, 520);
  const panelPaddingBottom = insets.bottom + (isCompact ? 18 : 26);

  useEffect(() => {
    appear.setValue(0);
    Animated.timing(appear, {
      toValue: 1,
      duration: 430,
      delay: 80,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [appear, index]);

  const finish = async () => {
    await AsyncStorage.setItem(storageKeys.onboardingSeen, 'true');
    navigation.replace('Main');
  };

  const next = () => {
    if (isLast) {
      finish();
      return;
    }

    listRef.current?.scrollToIndex({index: index + 1, animated: true});
  };

  const onMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(nextIndex);
  };

  const renderItem = ({item}: {item: OnboardingItem}) => {
    const imageStyle =
      item.imageMode === 'map'
        ? [styles.mapImage, {width: width * (isCompact ? 0.7 : 0.78), height: width * (isCompact ? 0.7 : 0.78)}]
        : item.imageMode === 'bison'
          ? [styles.bisonImage, {width: width * 0.9, height: heroHeight * (isCompact ? 0.68 : 0.72)}]
          : [styles.characterImage, {width: width * (isCompact ? 0.72 : 0.78), height: heroHeight * (isCompact ? 0.74 : 0.8)}];

    return (
      <View style={[styles.slide, {width}]}>
        <ImageBackground source={appImages.westernValley} style={[styles.hero, {height: heroHeight}]} resizeMode="cover">
          <View style={styles.heroShade} />
          <Image source={item.image} style={imageStyle} resizeMode="contain" />
        </ImageBackground>
        <Animated.View
          style={[
            styles.panel,
            isCompact && styles.panelCompact,
            {
              paddingBottom: panelPaddingBottom,
              opacity: appear,
              transform: [
                {
                  translateY: appear.interpolate({
                    inputRange: [0, 1],
                    outputRange: [22, 0],
                  }),
                },
              ],
            },
          ]}>
          <View style={[styles.marker, isCompact && styles.markerCompact]} />
          <Text style={[styles.title, isCompact && styles.titleCompact]} numberOfLines={2} adjustsFontSizeToFit>
            {item.title}
          </Text>
          <Text style={[styles.body, isCompact && styles.bodyCompact]}>{item.body}</Text>
          <View style={[styles.dots, isCompact && styles.dotsCompact]}>
            {onboardingItems.map((dot, dotIndex) => (
              <View
                key={dot.id}
                style={[styles.dot, dotIndex === index && styles.dotActive]}
              />
            ))}
          </View>
          <GradientButton
            label={isLast ? 'Start Exploring' : 'Continue'}
            emoji={isLast ? '🧭' : '›'}
            onPress={next}
            style={[styles.button, isCompact && styles.buttonCompact]}
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <FlatList
        ref={listRef}
        data={onboardingItems}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onMomentumScrollEnd={onMomentumEnd}
        getItemLayout={(_, itemIndex) => ({
          length: width,
          offset: width * itemIndex,
          index: itemIndex,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  slide: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  characterImage: {
    marginBottom: -2,
  },
  bisonImage: {
    marginBottom: 2,
  },
  mapImage: {
    borderRadius: radii.lg,
    marginBottom: 12,
  },
  panel: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  panelCompact: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  marker: {
    width: 36,
    height: 3,
    borderRadius: 99,
    backgroundColor: colors.accent,
    marginBottom: 16,
  },
  markerCompact: {
    marginBottom: 12,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
  },
  titleCompact: {
    fontSize: 22,
    lineHeight: 27,
  },
  body: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
  bodyCompact: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 9,
  },
  dots: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 18,
  },
  dotsCompact: {
    marginTop: 16,
    marginBottom: 14,
  },
  dot: {
    width: 7,
    height: 3,
    borderRadius: 99,
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
  },
  dotActive: {
    width: 28,
    backgroundColor: colors.accent,
  },
  button: {
    width: '100%',
  },
  buttonCompact: {
    borderRadius: radii.md,
  },
});
