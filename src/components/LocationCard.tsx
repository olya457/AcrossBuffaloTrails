import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors, radii} from '../theme';
import type {LocationItem} from '../types';
import {useCompactLayout} from '../utils/layout';
import {GradientButton} from './GradientButton';
import {IconButton} from './IconButton';
import {Rating} from './Rating';

type LocationCardProps = {
  location: LocationItem;
  onPress: () => void;
  onMap?: () => void;
  onToggleSaved?: () => void;
  onShare?: () => void;
  saved?: boolean;
  compact?: boolean;
};

export function LocationCard({
  location,
  onPress,
  onMap,
  onToggleSaved,
  onShare,
  saved,
  compact,
}: LocationCardProps) {
  const {isCompact} = useCompactLayout();

  if (compact) {
    return (
      <Pressable onPress={onPress} style={({pressed}) => [styles.compact, isCompact && styles.compactSmall, pressed && styles.pressed]}>
        <Image source={location.image} style={[styles.compactImage, isCompact && styles.compactImageSmall]} resizeMode="cover" />
        <View style={styles.compactBody}>
          <Text style={[styles.compactTitle, isCompact && styles.compactTitleSmall]} numberOfLines={2}>
            {location.title}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            📍 {location.coordinates.latitude.toFixed(4)}, {location.coordinates.longitude.toFixed(4)}
          </Text>
          <Text style={[styles.compactDescription, isCompact && styles.compactDescriptionSmall]} numberOfLines={2}>
            {location.description}
          </Text>
          <View style={styles.compactActions}>
            {onMap ? <GradientButton label="Map" onPress={onMap} style={styles.compactButton} /> : null}
            {onToggleSaved ? (
              <IconButton emoji={saved ? '🔖' : '📑'} active={saved} onPress={onToggleSaved} label="Saved" />
            ) : null}
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, isCompact && styles.cardSmall]}>
      <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
        <ImageBackground source={location.image} style={[styles.image, isCompact && styles.imageSmall]} imageStyle={styles.imageRadius}>
          <View style={styles.imageShade} />
          <View style={styles.ratingPill}>
            <Rating value={location.rating} />
          </View>
          <Text style={styles.coordinatePill} numberOfLines={1}>
            📍 Coordinates: {location.coordinates.latitude.toFixed(4)}, {location.coordinates.longitude.toFixed(4)}
          </Text>
        </ImageBackground>
        <View style={[styles.body, isCompact && styles.bodySmall]}>
          <Text style={[styles.title, isCompact && styles.titleSmall]} numberOfLines={2}>
            {location.shortTitle}
          </Text>
          <Text style={[styles.description, isCompact && styles.descriptionSmall]} numberOfLines={2}>
            {location.description}
          </Text>
        </View>
      </Pressable>
      <View style={[styles.actions, isCompact && styles.actionsSmall]}>
        {onMap ? <GradientButton label="View Details" onPress={onPress} style={styles.primaryAction} /> : null}
        {onToggleSaved ? (
          <IconButton emoji={saved ? '🔖' : '📑'} active={saved} onPress={onToggleSaved} label="Saved" />
        ) : null}
        {onShare ? <IconButton emoji="🔗" onPress={onShare} label="Share" /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSoft,
    marginBottom: 18,
  },
  cardSmall: {
    marginBottom: 14,
  },
  image: {
    height: 170,
    justifyContent: 'space-between',
    padding: 10,
  },
  imageSmall: {
    height: 148,
  },
  imageRadius: {
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  ratingPill: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(33, 20, 16, 0.78)',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  coordinatePill: {
    alignSelf: 'flex-start',
    color: colors.backgroundDeep,
    backgroundColor: 'rgba(255, 198, 84, 0.72)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 7,
    fontSize: 11,
    fontWeight: '700',
    maxWidth: '96%',
  },
  body: {
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  bodySmall: {
    paddingHorizontal: 11,
    paddingTop: 9,
  },
  title: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
  },
  titleSmall: {
    fontSize: 17,
  },
  description: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  descriptionSmall: {
    fontSize: 12,
    lineHeight: 17,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
  },
  actionsSmall: {
    gap: 8,
    padding: 10,
  },
  primaryAction: {
    flex: 1,
  },
  compact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    marginBottom: 14,
  },
  compactSmall: {
    gap: 10,
    padding: 10,
  },
  compactImage: {
    width: 104,
    height: 112,
    borderRadius: radii.md,
  },
  compactImageSmall: {
    width: 88,
    height: 94,
  },
  compactBody: {
    flex: 1,
  },
  compactTitle: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '900',
  },
  compactTitleSmall: {
    fontSize: 14,
    lineHeight: 18,
  },
  meta: {
    color: colors.mutedDark,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
  compactDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 6,
  },
  compactDescriptionSmall: {
    fontSize: 11,
    lineHeight: 15,
  },
  compactActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  compactButton: {
    flex: 1,
  },
  pressed: {
    opacity: 0.82,
  },
});
