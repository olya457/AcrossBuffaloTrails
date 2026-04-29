import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IconButton} from '../components/IconButton';
import {Screen} from '../components/Screen';
import {articleById} from '../data/articles';
import {colors} from '../theme';
import {useCompactLayout} from '../utils/layout';

type ArticleDetailScreenProps = {
  navigation: any;
  route: {
    params: {
      articleId: string;
    };
  };
};

export function ArticleDetailScreen({navigation, route}: ArticleDetailScreenProps) {
  const article = articleById[route.params.articleId];
  const insets = useSafeAreaInsets();
  const {isCompact} = useCompactLayout();

  return (
    <Screen scroll noTopPadding noHorizontalPadding contentContainerStyle={styles.content}>
      <ImageBackground source={article.image} style={[styles.hero, isCompact && styles.heroCompact]}>
        <View style={styles.heroShade} />
        <IconButton
          emoji="⬅️"
          onPress={() => navigation.goBack()}
          style={[styles.back, {top: insets.top + 14}]}
          label="Back"
        />
      </ImageBackground>
      <View style={[styles.body, isCompact && styles.bodyCompact]}>
        <View style={[styles.tag, isCompact && styles.tagCompact]}>
          <Text style={[styles.tagText, isCompact && styles.tagTextCompact]}>🏷️ {article.category}</Text>
        </View>
        <Text style={[styles.meta, isCompact && styles.metaCompact]}>◷ {article.readTime} · {article.date}</Text>
        <Text style={[styles.title, isCompact && styles.titleCompact]} numberOfLines={3} adjustsFontSizeToFit>
          {article.title}
        </Text>
        <View style={[styles.rule, isCompact && styles.ruleCompact]} />
        <View style={[styles.subtitles, isCompact && styles.subtitlesCompact]}>
          {article.subtitles.map(item => (
            <View key={item} style={[styles.subtitlePill, isCompact && styles.subtitlePillCompact]}>
              <Text style={[styles.subtitleText, isCompact && styles.subtitleTextCompact]}>{item}</Text>
            </View>
          ))}
        </View>
        {article.content.map(paragraph => (
          <Text key={paragraph} style={[styles.paragraph, isCompact && styles.paragraphCompact]}>
            {paragraph}
          </Text>
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
    height: 300,
  },
  heroCompact: {
    height: 240,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  back: {
    position: 'absolute',
    left: 18,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  bodyCompact: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  tag: {
    alignSelf: 'flex-start',
    borderRadius: 99,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(178, 106, 244, 0.16)',
  },
  tagCompact: {
    paddingVertical: 6,
    paddingHorizontal: 9,
  },
  tagText: {
    color: colors.violet,
    fontSize: 11,
    fontWeight: '900',
  },
  tagTextCompact: {
    fontSize: 10,
  },
  meta: {
    color: colors.mutedDark,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 14,
  },
  metaCompact: {
    fontSize: 11,
    marginTop: 12,
  },
  title: {
    color: colors.text,
    fontSize: 29,
    lineHeight: 34,
    fontWeight: '900',
    marginTop: 12,
  },
  titleCompact: {
    fontSize: 25,
    lineHeight: 30,
    marginTop: 10,
  },
  rule: {
    width: 54,
    height: 2,
    backgroundColor: colors.accent,
    borderRadius: 99,
    marginTop: 18,
    marginBottom: 14,
  },
  ruleCompact: {
    marginTop: 14,
    marginBottom: 11,
  },
  subtitles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  subtitlesCompact: {
    gap: 6,
    marginBottom: 6,
  },
  subtitlePill: {
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  subtitlePillCompact: {
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  subtitleText: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '800',
  },
  subtitleTextCompact: {
    fontSize: 10,
  },
  paragraph: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 25,
    marginTop: 15,
  },
  paragraphCompact: {
    fontSize: 14,
    lineHeight: 23,
    marginTop: 12,
  },
});
