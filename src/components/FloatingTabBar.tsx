import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, radii} from '../theme';
import {getBottomPanelGap, tabBarHeight, useCompactLayout} from '../utils/layout';

const tabMeta: Record<string, {label: string; emoji: string}> = {
  TrailsTab: {label: 'Trails', emoji: '🦬'},
  MapTab: {label: 'Map', emoji: '🗺️'},
  PickTab: {label: 'Learn', emoji: '📘'},
  NotesTab: {label: 'Notes', emoji: '📜'},
  SavedTab: {label: 'Saved', emoji: '🔖'},
};

export function FloatingTabBar({state, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const {isCompact} = useCompactLayout();

  return (
    <View
      style={[
        styles.shell,
        isCompact && styles.shellCompact,
        {
          bottom: getBottomPanelGap(insets),
        },
      ]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const active = state.index === index;
          const meta = tabMeta[route.name];

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={active ? {selected: true} : {}}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!active && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              style={({pressed}) => [
                styles.item,
                pressed && styles.pressed,
              ]}>
              <View style={[styles.iconWrap, isCompact && styles.iconWrapCompact, active && styles.iconActive]}>
                <Text style={[styles.emoji, isCompact && styles.emojiCompact]}>{meta.emoji}</Text>
              </View>
              <Text
                style={[styles.label, isCompact && styles.labelCompact, active && styles.labelActive]}
                numberOfLines={1}
                adjustsFontSizeToFit>
                {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    position: 'absolute',
    left: 14,
    right: 14,
    height: tabBarHeight,
  },
  shellCompact: {
    left: 10,
    right: 10,
    height: 66,
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(31, 13, 7, 0.96)',
    paddingHorizontal: 8,
    shadowColor: colors.shadow,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 10},
    elevation: 12,
  },
  item: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  iconWrap: {
    width: 36,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapCompact: {
    width: 32,
    height: 28,
  },
  iconActive: {
    backgroundColor: 'rgba(255, 179, 44, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255, 195, 78, 0.75)',
  },
  emoji: {
    fontSize: 18,
  },
  emojiCompact: {
    fontSize: 16,
  },
  label: {
    color: colors.mutedDark,
    fontSize: 10,
    fontWeight: '700',
  },
  labelCompact: {
    fontSize: 9,
  },
  labelActive: {
    color: colors.gold,
  },
  pressed: {
    opacity: 0.75,
  },
});
