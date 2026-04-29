import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GradientButton} from '../components/GradientButton';
import {IconButton} from '../components/IconButton';
import {Rating} from '../components/Rating';
import {Screen} from '../components/Screen';
import {useSaved} from '../context/SavedContext';
import {locationById} from '../data/locations';
import {colors, radii} from '../theme';
import {openExternalMap, shareLocation} from '../utils/actions';
import {useCompactLayout} from '../utils/layout';

type LocationDetailScreenProps = {
  navigation: any;
  route: {
    params: {
      locationId: string;
    };
  };
};

export function LocationDetailScreen({navigation, route}: LocationDetailScreenProps) {
  const {isCompact} = useCompactLayout();
  const location = locationById[route.params.locationId];
  const {isSaved, toggleSaved} = useSaved();
  const insets = useSafeAreaInsets();
  const saved = isSaved(location.id);

  const openInMapTab = () => {
    navigation.getParent()?.navigate('MapTab', {
      screen: 'MapHome',
      params: {selectedLocationId: location.id},
    });
  };

  return (
    <Screen scroll noTopPadding noHorizontalPadding contentContainerStyle={styles.content}>
      <ImageBackground source={location.image} style={[styles.hero, isCompact && styles.heroCompact]}>
        <View style={styles.heroShade} />
        <View style={[styles.topActions, {top: insets.top + 14}]}>
          <IconButton emoji="⬅️" onPress={() => navigation.goBack()} label="Back" />
          <View style={styles.rightActions}>
            <IconButton emoji={saved ? '🔖' : '📑'} active={saved} onPress={() => toggleSaved(location.id)} label="Saved" />
            <IconButton emoji="🔗" onPress={() => shareLocation(location)} label="Share" />
          </View>
        </View>
        <Text style={styles.coordinatePill} numberOfLines={1}>
          📍 Coordinates: {location.coordinates.latitude.toFixed(4)}, {location.coordinates.longitude.toFixed(4)}
        </Text>
      </ImageBackground>

      <View style={[styles.body, isCompact && styles.bodyCompact]}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{location.emoji} {location.categoryTitle}</Text>
        </View>
        <Text style={[styles.title, isCompact && styles.titleCompact]} numberOfLines={2} adjustsFontSizeToFit>
          {location.shortTitle}
        </Text>
        <Rating value={location.rating} label={location.readLabel} />
        <Text style={styles.address}>{location.address}</Text>
        <Text style={[styles.details, isCompact && styles.detailsCompact]}>{location.details}</Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>HIGHLIGHTS</Text>
            {location.highlights.map(item => (
              <Text key={item} style={styles.infoText}>• {item}</Text>
            ))}
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>BEST FOR</Text>
            {location.bestFor.map(item => (
              <Text key={item} style={styles.infoText}>• {item}</Text>
            ))}
          </View>
        </View>

        <View style={styles.buttonRow}>
          <GradientButton label="View on Map" emoji="🗺️" onPress={openInMapTab} style={styles.mainButton} />
          <IconButton emoji={saved ? '🔖' : '📑'} active={saved} onPress={() => toggleSaved(location.id)} label="Saved" />
        </View>
        <Pressable onPress={() => openExternalMap(location)} style={({pressed}) => [styles.secondaryButton, pressed && styles.pressed]}>
          <Text style={styles.secondaryText}>🧭 Open Navigation</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 0,
  },
  hero: {
    height: 310,
    justifyContent: 'flex-end',
    padding: 12,
  },
  heroCompact: {
    height: 250,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  topActions: {
    position: 'absolute',
    left: 18,
    right: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightActions: {
    flexDirection: 'row',
    gap: 9,
  },
  coordinatePill: {
    alignSelf: 'flex-start',
    color: colors.backgroundDeep,
    backgroundColor: 'rgba(255, 198, 84, 0.72)',
    borderRadius: 13,
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontSize: 11,
    fontWeight: '800',
    maxWidth: '96%',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  bodyCompact: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(255, 195, 78, 0.35)',
    backgroundColor: 'rgba(255, 179, 44, 0.1)',
    marginBottom: 13,
  },
  categoryText: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '900',
  },
  title: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: '900',
    marginBottom: 8,
  },
  titleCompact: {
    fontSize: 26,
    lineHeight: 31,
  },
  address: {
    color: colors.mutedDark,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    marginTop: 10,
  },
  details: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 25,
    marginTop: 18,
  },
  detailsCompact: {
    fontSize: 14,
    lineHeight: 23,
    marginTop: 14,
  },
  infoGrid: {
    gap: 12,
    marginTop: 20,
  },
  infoBox: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    padding: 14,
  },
  infoLabel: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 8,
  },
  infoText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
  },
  mainButton: {
    flex: 1,
  },
  secondaryButton: {
    minHeight: 52,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginTop: 12,
  },
  secondaryText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.75,
  },
});
