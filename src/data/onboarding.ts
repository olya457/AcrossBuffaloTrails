import {appImages} from './assets';
import type {OnboardingItem} from '../types';

export const onboardingItems: OnboardingItem[] = [
  {
    id: 'discover',
    title: 'Discover Buffalo-Inspired Places',
    body: 'Uncover sacred sites, monuments, stadiums, and wide landscapes that celebrate the spirit of the American bison.',
    image: appImages.onboardingBisonHost,
    imageMode: 'character',
  },
  {
    id: 'routes',
    title: 'Explore Routes Across the USA',
    body: 'Follow curated road trips through the Great Plains, the West, mountain towns, historic arenas, and urban landmarks.',
    image: appImages.onboardingTrailRanger,
    imageMode: 'character',
  },
  {
    id: 'landmarks',
    title: 'Find Unique Landmarks',
    body: 'Move from towering bronze statues to wildlife refuges and places where buffalo identity shaped local culture.',
    image: appImages.onboardingScout,
    imageMode: 'character',
  },
  {
    id: 'save',
    title: 'Save Your Favorite Spots',
    body: 'Build a personal travel collection that stays on your device after restart until you remove a place yourself.',
    image: appImages.onboardingChargingBison,
    imageMode: 'bison',
  },
  {
    id: 'start',
    title: 'Start Your Journey',
    body: 'The trail awaits. Every route tells a story, and every saved place brings your next buffalo road trip closer.',
    image: appImages.habitatMap,
    imageMode: 'map',
  },
];
