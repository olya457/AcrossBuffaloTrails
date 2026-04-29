import type {ImageSourcePropType} from 'react-native';

export type CategoryId = 'bull' | 'rodeo' | 'ranch' | 'sports';

export type LocationItem = {
  id: string;
  title: string;
  shortTitle: string;
  categoryId: CategoryId;
  categoryTitle: string;
  emoji: string;
  description: string;
  summary: string;
  details: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  image: ImageSourcePropType;
  rating: number;
  readLabel: string;
  highlights: string[];
  bestFor: string[];
};

export type CategoryItem = {
  id: CategoryId;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  image: ImageSourcePropType;
  heroTitle: string;
  heroSubtitle: string;
};

export type ArticleItem = {
  id: string;
  title: string;
  subtitles: string[];
  category: string;
  readTime: string;
  date: string;
  image: ImageSourcePropType;
  content: string[];
};

export type OnboardingItem = {
  id: string;
  title: string;
  body: string;
  image: ImageSourcePropType;
  imageMode: 'character' | 'map' | 'bison';
};

export type RootStackParamList = {
  Loader: undefined;
  Onboarding: undefined;
  Main: undefined;
};

export type TabParamList = {
  TrailsTab: undefined;
  MapTab: {
    screen?: string;
    params?: {
      selectedLocationId?: string;
    };
  } | undefined;
  PickTab: undefined;
  NotesTab: undefined;
  SavedTab: undefined;
};

export type TrailsStackParamList = {
  TrailsHome: undefined;
  Category: {
    categoryId: CategoryId;
  };
  LocationDetail: {
    locationId: string;
  };
};

export type MapStackParamList = {
  MapHome: {
    selectedLocationId?: string;
  } | undefined;
  MapLocationDetail: {
    locationId: string;
  };
};

export type PickStackParamList = {
  HornPickHome: undefined;
  QuizGame: undefined;
  CrosswordGame: undefined;
};

export type NotesStackParamList = {
  NotesHome: undefined;
  ArticleDetail: {
    articleId: string;
  };
};

export type SavedStackParamList = {
  SavedHome: undefined;
  SavedLocationDetail: {
    locationId: string;
  };
};
