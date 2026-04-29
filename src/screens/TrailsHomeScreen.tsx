import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Screen} from '../components/Screen';
import {categories, locations, locationsByCategory} from '../data/locations';
import {colors, radii} from '../theme';
import type {TrailsStackParamList} from '../types';
import {useCompactLayout} from '../utils/layout';

type TrailsHomeScreenProps = NativeStackScreenProps<TrailsStackParamList, 'TrailsHome'>;

export function TrailsHomeScreen({navigation}: TrailsHomeScreenProps) {
  const {isCompact} = useCompactLayout();
  const featured = categories.find(category => category.id === 'ranch') ?? categories[0];

  return (
    <Screen scroll>
      <View style={[styles.header, isCompact && styles.headerCompact]}>
        <Text style={styles.eyebrow}>EXPLORE</Text>
        <Text style={[styles.title, isCompact && styles.titleCompact]} numberOfLines={1} adjustsFontSizeToFit>
          Buffalo Trails
        </Text>
        <Text style={styles.subtitle}>
          {categories.length} categories · {locations.length} locations across the USA
        </Text>
      </View>

      <Pressable
        onPress={() => navigation.navigate('Category', {categoryId: featured.id})}
        style={({pressed}) => [styles.featured, isCompact && styles.featuredCompact, pressed && styles.pressed]}>
        <ImageBackground source={featured.image} style={[styles.featuredImage, isCompact && styles.featuredImageCompact]} imageStyle={styles.featuredRadius}>
          <View style={styles.featuredShade} />
          <View style={[styles.featuredBadge, isCompact && styles.featuredBadgeCompact]}>
            <Text style={styles.featuredBadgeText}>FEATURED</Text>
          </View>
          <View style={styles.featuredText}>
            <Text style={[styles.featuredTitle, isCompact && styles.featuredTitleCompact]}>{featured.heroTitle}</Text>
            <Text style={styles.featuredSubtitle}>
              {locationsByCategory(featured.id).length} locations
            </Text>
          </View>
        </ImageBackground>
      </Pressable>

      <Text style={styles.sectionLabel}>ALL CATEGORIES</Text>
      {categories.map(category => (
        <Pressable
          key={category.id}
          onPress={() => navigation.navigate('Category', {categoryId: category.id})}
          style={({pressed}) => [styles.category, isCompact && styles.categoryCompact, pressed && styles.pressed]}>
          <ImageBackground source={category.image} style={[styles.categoryImage, isCompact && styles.categoryImageCompact]} imageStyle={styles.categoryImageRadius}>
            <View style={[styles.emojiBadge, isCompact && styles.emojiBadgeCompact, {backgroundColor: category.color}]}>
              <Text style={[styles.categoryEmoji, isCompact && styles.categoryEmojiCompact]}>{category.emoji}</Text>
            </View>
          </ImageBackground>
          <View style={[styles.categoryBody, isCompact && styles.categoryBodyCompact]}>
            <Text style={[styles.categoryTitle, isCompact && styles.categoryTitleCompact]} numberOfLines={2}>
              {category.title}
            </Text>
            <Text style={[styles.categorySubtitle, isCompact && styles.categorySubtitleCompact]} numberOfLines={2}>
              {category.subtitle}
            </Text>
            <Text style={[styles.categoryCount, {color: category.color}]}>
              📍 {locationsByCategory(category.id).length} locations
            </Text>
          </View>
          <Text style={styles.categoryArrow}>›</Text>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 18,
  },
  headerCompact: {
    marginBottom: 14,
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
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  featured: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: 18,
  },
  featuredCompact: {
    marginBottom: 14,
  },
  featuredImage: {
    height: 160,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 18,
  },
  featuredImageCompact: {
    height: 138,
    padding: 14,
  },
  featuredRadius: {
    borderRadius: radii.lg,
  },
  featuredShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
  },
  featuredBadge: {
    position: 'absolute',
    top: 88,
    alignSelf: 'center',
    backgroundColor: colors.accent,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  featuredBadgeCompact: {
    top: 72,
  },
  featuredBadgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '900',
  },
  featuredText: {
    alignItems: 'center',
  },
  featuredTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  featuredTitleCompact: {
    fontSize: 17,
  },
  featuredSubtitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  sectionLabel: {
    color: colors.mutedDark,
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 10,
  },
  category: {
    minHeight: 116,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSoft,
    marginBottom: 12,
  },
  categoryCompact: {
    minHeight: 102,
    marginBottom: 10,
  },
  categoryImage: {
    width: 92,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 8,
  },
  categoryImageCompact: {
    width: 82,
  },
  categoryImageRadius: {
    borderTopLeftRadius: radii.lg,
    borderBottomLeftRadius: radii.lg,
  },
  emojiBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiBadgeCompact: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  categoryEmoji: {
    fontSize: 18,
  },
  categoryEmojiCompact: {
    fontSize: 16,
  },
  categoryBody: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  categoryBodyCompact: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  categoryTitle: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '900',
  },
  categoryTitleCompact: {
    fontSize: 14,
    lineHeight: 18,
  },
  categorySubtitle: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
  },
  categorySubtitleCompact: {
    fontSize: 11,
    lineHeight: 16,
  },
  categoryCount: {
    fontSize: 11,
    fontWeight: '900',
    marginTop: 7,
  },
  categoryArrow: {
    alignSelf: 'center',
    color: colors.mutedDark,
    fontSize: 30,
    paddingRight: 14,
    paddingLeft: 2,
  },
  pressed: {
    opacity: 0.82,
  },
});
