import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {IconButton} from '../components/IconButton';
import {LocationCard} from '../components/LocationCard';
import {Screen} from '../components/Screen';
import {useSaved} from '../context/SavedContext';
import {categoryById, locationsByCategory} from '../data/locations';
import {colors, radii} from '../theme';
import type {TrailsStackParamList} from '../types';
import {shareLocation} from '../utils/actions';
import {useCompactLayout} from '../utils/layout';

type CategoryScreenProps = NativeStackScreenProps<TrailsStackParamList, 'Category'>;

export function CategoryScreen({navigation, route}: CategoryScreenProps) {
  const {isCompact} = useCompactLayout();
  const category = categoryById[route.params.categoryId];
  const categoryLocations = locationsByCategory(category.id);
  const {isSaved, toggleSaved} = useSaved();

  return (
    <Screen scroll noHorizontalPadding contentContainerStyle={styles.content}>
      <ImageBackground source={category.image} style={[styles.hero, isCompact && styles.heroCompact]} imageStyle={styles.heroImage}>
        <View style={styles.heroShade} />
        <IconButton emoji="⬅️" onPress={() => navigation.goBack()} style={styles.back} label="Back" />
        <View style={styles.heroText}>
          <Text style={[styles.heroTitle, isCompact && styles.heroTitleCompact]} numberOfLines={2} adjustsFontSizeToFit>
            {category.heroTitle}
          </Text>
          <Text style={styles.heroSubtitle}>{category.heroSubtitle}</Text>
        </View>
      </ImageBackground>
      <View style={[styles.list, isCompact && styles.listCompact]}>
        {categoryLocations.map(location => (
          <LocationCard
            key={location.id}
            location={location}
            saved={isSaved(location.id)}
            onPress={() => navigation.navigate('LocationDetail', {locationId: location.id})}
            onMap={() => navigation.navigate('LocationDetail', {locationId: location.id})}
            onToggleSaved={() => toggleSaved(location.id)}
            onShare={() => shareLocation(location)}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 0,
  },
  hero: {
    height: 230,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
  heroCompact: {
    height: 190,
    paddingBottom: 18,
  },
  heroImage: {
    borderBottomLeftRadius: radii.lg,
    borderBottomRightRadius: radii.lg,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
  },
  back: {
    position: 'absolute',
    top: 16,
    left: 20,
  },
  heroText: {
    maxWidth: 310,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 27,
    lineHeight: 31,
    fontWeight: '900',
  },
  heroTitleCompact: {
    fontSize: 24,
    lineHeight: 28,
  },
  heroSubtitle: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 7,
  },
  list: {
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  listCompact: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
});
