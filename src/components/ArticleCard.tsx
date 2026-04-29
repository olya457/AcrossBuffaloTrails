import React from 'react';
import {Image, ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, radii} from '../theme';
import type {ArticleItem} from '../types';
import {useCompactLayout} from '../utils/layout';

type ArticleCardProps = {
  article: ArticleItem;
  onPress: () => void;
  featured?: boolean;
};

export function ArticleCard({article, onPress, featured}: ArticleCardProps) {
  const {isCompact} = useCompactLayout();

  if (featured) {
    return (
      <Pressable onPress={onPress} style={({pressed}) => [styles.featured, isCompact && styles.featuredCompact, pressed && styles.pressed]}>
        <ImageBackground source={article.image} style={[styles.featuredImage, isCompact && styles.featuredImageCompact]} imageStyle={styles.featuredImageRadius}>
          <View style={[styles.featuredBadge, isCompact && styles.featuredBadgeCompact]}>
            <Text style={[styles.badgeText, isCompact && styles.badgeTextCompact]}>FEATURED</Text>
          </View>
        </ImageBackground>
        <View style={[styles.featuredBody, isCompact && styles.featuredBodyCompact]}>
          <Text style={[styles.category, isCompact && styles.categoryCompact]}>🏷️ {article.category}</Text>
          <Text style={[styles.featuredTitle, isCompact && styles.featuredTitleCompact]} numberOfLines={2}>
            {article.title}
          </Text>
          <Text style={[styles.meta, isCompact && styles.metaCompact]}>◷ {article.readTime} · {article.date}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.row, isCompact && styles.rowCompact, pressed && styles.pressed]}>
      <Image source={article.image} style={[styles.rowImage, isCompact && styles.rowImageCompact]} />
      <View style={styles.rowBody}>
        <Text style={[styles.category, isCompact && styles.categoryCompact]} numberOfLines={1}>
          🏷️ {article.category}
        </Text>
        <Text style={[styles.rowTitle, isCompact && styles.rowTitleCompact]} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={[styles.meta, isCompact && styles.metaCompact]} numberOfLines={1}>
          ◷ {article.readTime} · {article.date}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  featured: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    marginBottom: 20,
  },
  featuredCompact: {
    marginBottom: 16,
  },
  featuredImage: {
    height: 150,
    padding: 12,
    justifyContent: 'flex-start',
  },
  featuredImageCompact: {
    height: 128,
    padding: 10,
  },
  featuredImageRadius: {
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: colors.accent,
  },
  featuredBadgeCompact: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '900',
  },
  badgeTextCompact: {
    fontSize: 9,
  },
  featuredBody: {
    padding: 14,
  },
  featuredBodyCompact: {
    padding: 12,
  },
  category: {
    color: colors.violet,
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 7,
  },
  categoryCompact: {
    fontSize: 10,
    marginBottom: 5,
  },
  featuredTitle: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '900',
  },
  featuredTitleCompact: {
    fontSize: 17,
    lineHeight: 22,
  },
  meta: {
    color: colors.mutedDark,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },
  metaCompact: {
    fontSize: 11,
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    minHeight: 96,
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    marginBottom: 12,
  },
  rowCompact: {
    gap: 10,
    minHeight: 84,
    marginBottom: 10,
  },
  rowImage: {
    width: 92,
    height: '100%',
  },
  rowImageCompact: {
    width: 82,
    height: 84,
  },
  rowBody: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingRight: 12,
  },
  rowTitle: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '900',
  },
  rowTitleCompact: {
    fontSize: 14,
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.82,
  },
});
