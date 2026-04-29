import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ArticleCard} from '../components/ArticleCard';
import {Screen} from '../components/Screen';
import {articles} from '../data/articles';
import {colors} from '../theme';
import type {NotesStackParamList} from '../types';
import {useCompactLayout} from '../utils/layout';

type NotesScreenProps = NativeStackScreenProps<NotesStackParamList, 'NotesHome'>;

export function NotesScreen({navigation}: NotesScreenProps) {
  const {isCompact} = useCompactLayout();
  const [featured, ...moreArticles] = articles;

  return (
    <Screen scroll>
      <View style={[styles.header, isCompact && styles.headerCompact]}>
        <Text style={[styles.title, isCompact && styles.titleCompact]} numberOfLines={1} adjustsFontSizeToFit>
          Stories & Routes
        </Text>
        <Text style={[styles.subtitle, isCompact && styles.subtitleCompact]}>
          {articles.length} articles on buffalo culture & travel
        </Text>
      </View>
      <ArticleCard
        article={featured}
        featured
        onPress={() => navigation.navigate('ArticleDetail', {articleId: featured.id})}
      />
      <Text style={styles.sectionLabel}>MORE ARTICLES</Text>
      {moreArticles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          onPress={() => navigation.navigate('ArticleDetail', {articleId: article.id})}
        />
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
    marginTop: 8,
  },
  subtitleCompact: {
    fontSize: 12,
    marginTop: 6,
  },
  sectionLabel: {
    color: colors.mutedDark,
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 10,
  },
});
