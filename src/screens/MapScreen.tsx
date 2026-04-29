import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GradientButton} from '../components/GradientButton';
import {IconButton} from '../components/IconButton';
import {useSaved} from '../context/SavedContext';
import {categories, categoryById, locationById, locations} from '../data/locations';
import {colors, radii} from '../theme';
import type {MapStackParamList} from '../types';
import {openExternalMap} from '../utils/actions';
import {Screen} from '../components/Screen';
import {useCompactLayout} from '../utils/layout';

type MapScreenProps = NativeStackScreenProps<MapStackParamList, 'MapHome'>;

const mapComponents = (() => {
  try {
    const maps = require('react-native-maps');
    return {
      MapView: maps.default,
      Marker: maps.Marker,
    };
  } catch {
    return {
      MapView: null,
      Marker: null,
    };
  }
})();

export function MapScreen({navigation, route}: MapScreenProps) {
  const mapRef = useRef<any>(null);
  const {isCompact} = useCompactLayout();
  const initialRegion = useMemo(
    () => ({
      latitude: 39.5,
      longitude: -98.35,
      latitudeDelta: 31,
      longitudeDelta: 52,
    }),
    [],
  );
  const [currentRegion, setCurrentRegion] = useState(initialRegion);
  const [selectedId, setSelectedId] = useState<string | undefined>(
    route.params?.selectedLocationId,
  );
  const {isSaved, toggleSaved} = useSaved();
  const selected = selectedId ? locationById[selectedId] : undefined;
  const selectedSaved = selected ? isSaved(selected.id) : false;

  useEffect(() => {
    if (route.params?.selectedLocationId) {
      setSelectedId(route.params.selectedLocationId);
      navigation.setParams({selectedLocationId: undefined});
    }
  }, [navigation, route.params?.selectedLocationId]);

  useEffect(() => {
    if (!selected) {
      return;
    }

    const nextRegion = {
      ...selected.coordinates,
      latitudeDelta: selected.categoryId === 'sports' ? 2.8 : 6.5,
      longitudeDelta: selected.categoryId === 'sports' ? 2.8 : 6.5,
    };

    setCurrentRegion(nextRegion);
    mapRef.current?.animateToRegion(
      nextRegion,
      420,
    );
  }, [selected]);

  const zoomBy = (factor: number) => {
    const nextRegion = {
      ...currentRegion,
      latitudeDelta: Math.min(Math.max(currentRegion.latitudeDelta * factor, 1.1), 40),
      longitudeDelta: Math.min(Math.max(currentRegion.longitudeDelta * factor, 1.1), 64),
    };

    setCurrentRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, 260);
  };

  const fitAllPins = () => {
    setSelectedId(undefined);

    if (mapRef.current?.fitToCoordinates) {
      mapRef.current.fitToCoordinates(
        locations.map(location => location.coordinates),
        {
          edgePadding: isCompact
            ? {top: 64, right: 44, bottom: 182, left: 44}
            : {top: 80, right: 70, bottom: 210, left: 70},
          animated: true,
        },
      );
      return;
    }

    setCurrentRegion(initialRegion);
    mapRef.current?.animateToRegion(
      {
        ...initialRegion,
      },
      260,
    );
  };

  return (
    <Screen noHorizontalPadding contentContainerStyle={styles.content}>
      <View style={[styles.header, isCompact && styles.headerCompact]}>
        <Text style={styles.eyebrow}>BUFFALO ROUTES</Text>
        <Text style={[styles.title, isCompact && styles.titleCompact]}>Trail Map</Text>
        <Text style={[styles.subtitle, isCompact && styles.subtitleCompact]}>
          {locations.length} locations · Tap any pin to explore
        </Text>
      </View>

      <View style={styles.mapShell}>
        {mapComponents.MapView && mapComponents.Marker ? (
          <mapComponents.MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={initialRegion}
            onRegionChangeComplete={setCurrentRegion}
            showsCompass
            toolbarEnabled={false}>
            {locations.map(location => {
              const color = categoryById[location.categoryId].color;
              const active = location.id === selected?.id;

              return (
                <mapComponents.Marker
                  key={location.id}
                  coordinate={location.coordinates}
                  onPress={() => setSelectedId(location.id)}>
                  <View
                    style={[
                      styles.marker,
                      isCompact && styles.markerCompact,
                      {borderColor: color},
                      active && styles.markerActive,
                      active && isCompact && styles.markerActiveCompact,
                    ]}>
                    <Text style={[styles.markerEmoji, isCompact && styles.markerEmojiCompact]}>
                      {location.emoji}
                    </Text>
                  </View>
                </mapComponents.Marker>
              );
            })}
          </mapComponents.MapView>
        ) : (
          <View style={styles.mapFallback}>
            <View style={styles.mapFallbackGrid} />
            {locations.slice(0, 14).map((location, index) => {
              const color = categoryById[location.categoryId].color;
              const left = `${12 + ((index * 23) % 74)}%` as `${number}%`;
              const top = `${10 + ((index * 31) % 70)}%` as `${number}%`;

              return (
                <Pressable
                  key={location.id}
                  onPress={() => setSelectedId(location.id)}
                  style={[styles.fallbackPin, isCompact && styles.fallbackPinCompact, {left, top, borderColor: color}]}>
                  <Text style={[styles.markerEmoji, isCompact && styles.markerEmojiCompact]}>
                    {location.emoji}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        <View style={[styles.legend, isCompact && styles.legendCompact]}>
          {categories.map(category => (
            <View key={category.id} style={[styles.legendRow, isCompact && styles.legendRowCompact]}>
              <View style={[styles.legendDot, {backgroundColor: category.color}]} />
              <Text style={[styles.legendText, isCompact && styles.legendTextCompact]}>
                {category.title.split(' ')[0]}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.controls, isCompact && styles.controlsCompact]}>
          <IconButton emoji="➕" onPress={() => zoomBy(0.55)} style={[styles.controlButton, isCompact && styles.controlButtonCompact]} label="Zoom in" />
          <IconButton emoji="➖" onPress={() => zoomBy(1.7)} style={[styles.controlButton, isCompact && styles.controlButtonCompact]} label="Zoom out" />
          <IconButton emoji="🎯" onPress={fitAllPins} style={[styles.controlButton, isCompact && styles.controlButtonCompact]} label="Show all" />
        </View>

        {selected ? (
          <View style={[styles.sheet, isCompact && styles.sheetCompact]}>
            <IconButton
              emoji="✖️"
              onPress={() => setSelectedId(undefined)}
              style={[styles.closeButton, isCompact && styles.closeButtonCompact]}
              label="Close location preview"
            />
            <Pressable
              onPress={() => navigation.navigate('MapLocationDetail', {locationId: selected.id})}
              style={({pressed}) => [styles.sheetTop, isCompact && styles.sheetTopCompact, pressed && styles.pressed]}>
              <Image source={selected.image} style={[styles.sheetImage, isCompact && styles.sheetImageCompact]} />
              <View style={styles.sheetBody}>
                <Text style={[styles.sheetTitle, isCompact && styles.sheetTitleCompact]} numberOfLines={2}>
                  {selected.shortTitle}
                </Text>
                <Text style={[styles.sheetCoordinates, isCompact && styles.sheetCoordinatesCompact]} numberOfLines={1}>
                  📍 {selected.coordinates.latitude.toFixed(4)}, {selected.coordinates.longitude.toFixed(4)}
                </Text>
                <Text style={[styles.sheetDescription, isCompact && styles.sheetDescriptionCompact]} numberOfLines={2}>
                  {selected.description}
                </Text>
              </View>
            </Pressable>
            <View style={[styles.sheetActions, isCompact && styles.sheetActionsCompact]}>
              <GradientButton
                label="Navigate Here"
                emoji="🗺️"
                onPress={() => openExternalMap(selected)}
                style={styles.navigateButton}
              />
              <IconButton emoji={selectedSaved ? '🔖' : '📑'} active={selectedSaved} onPress={() => toggleSaved(selected.id)} label="Saved" />
            </View>
          </View>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  headerCompact: {
    paddingHorizontal: 16,
    paddingBottom: 12,
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
  subtitleCompact: {
    fontSize: 12,
  },
  mapShell: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#68C9D9',
  },
  mapFallbackGrid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(91, 182, 119, 0.38)',
  },
  fallbackPin: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34, 17, 10, 0.9)',
  },
  fallbackPinCompact: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
  },
  marker: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34, 17, 10, 0.9)',
  },
  markerCompact: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
  },
  markerActive: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundDeep,
  },
  markerActiveCompact: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  markerEmoji: {
    fontSize: 17,
  },
  markerEmojiCompact: {
    fontSize: 15,
  },
  legend: {
    position: 'absolute',
    top: 18,
    right: 14,
    borderRadius: radii.md,
    padding: 10,
    gap: 7,
    backgroundColor: 'rgba(22, 15, 33, 0.86)',
  },
  legendCompact: {
    top: 12,
    right: 10,
    padding: 8,
    gap: 5,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  legendRowCompact: {
    gap: 6,
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  legendText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
  },
  legendTextCompact: {
    fontSize: 10,
  },
  controls: {
    position: 'absolute',
    left: 14,
    top: 18,
    gap: 8,
  },
  controlsCompact: {
    left: 10,
    top: 12,
    gap: 6,
  },
  controlButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(22, 15, 33, 0.86)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
  },
  controlButtonCompact: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  sheet: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 14,
    borderRadius: radii.xl,
    padding: 12,
    backgroundColor: 'rgba(23, 15, 37, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  sheetCompact: {
    left: 10,
    right: 10,
    bottom: 10,
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  closeButtonCompact: {
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  sheetTop: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 44,
  },
  sheetTopCompact: {
    gap: 10,
    paddingRight: 38,
  },
  sheetImage: {
    width: 74,
    height: 74,
    borderRadius: radii.sm,
  },
  sheetImageCompact: {
    width: 62,
    height: 62,
  },
  sheetBody: {
    flex: 1,
  },
  sheetTitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '900',
  },
  sheetTitleCompact: {
    fontSize: 15,
    lineHeight: 19,
  },
  sheetCoordinates: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 5,
  },
  sheetCoordinatesCompact: {
    fontSize: 10,
    marginTop: 4,
  },
  sheetDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 6,
  },
  sheetDescriptionCompact: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
  },
  sheetActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  sheetActionsCompact: {
    gap: 8,
    marginTop: 10,
  },
  navigateButton: {
    flex: 1,
  },
  pressed: {
    opacity: 0.78,
  },
});
