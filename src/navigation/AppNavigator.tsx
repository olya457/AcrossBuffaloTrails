import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {FloatingTabBar} from '../components/FloatingTabBar';
import {ArticleDetailScreen} from '../screens/ArticleDetailScreen';
import {CategoryScreen} from '../screens/CategoryScreen';
import {CrosswordGameScreen} from '../screens/CrosswordGameScreen';
import {HornPickScreen} from '../screens/HornPickScreen';
import {LoaderScreen} from '../screens/LoaderScreen';
import {LocationDetailScreen} from '../screens/LocationDetailScreen';
import {MapScreen} from '../screens/MapScreen';
import {NotesScreen} from '../screens/NotesScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {QuizGameScreen} from '../screens/QuizGameScreen';
import {SavedScreen} from '../screens/SavedScreen';
import {TrailsHomeScreen} from '../screens/TrailsHomeScreen';
import type {
  MapStackParamList,
  NotesStackParamList,
  PickStackParamList,
  RootStackParamList,
  SavedStackParamList,
  TabParamList,
  TrailsStackParamList,
} from '../types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const TrailsStack = createNativeStackNavigator<TrailsStackParamList>();
const MapStack = createNativeStackNavigator<MapStackParamList>();
const PickStack = createNativeStackNavigator<PickStackParamList>();
const NotesStack = createNativeStackNavigator<NotesStackParamList>();
const SavedStack = createNativeStackNavigator<SavedStackParamList>();

const stackOptions = {
  headerShown: false,
  animation: 'fade_from_bottom',
  contentStyle: {
    backgroundColor: '#4A1F0D',
  },
} as const;

function TrailsStackNavigator() {
  return (
    <TrailsStack.Navigator screenOptions={stackOptions}>
      <TrailsStack.Screen name="TrailsHome" component={TrailsHomeScreen} />
      <TrailsStack.Screen name="Category" component={CategoryScreen} />
      <TrailsStack.Screen name="LocationDetail" component={LocationDetailScreen} />
    </TrailsStack.Navigator>
  );
}

function MapStackNavigator() {
  return (
    <MapStack.Navigator screenOptions={stackOptions}>
      <MapStack.Screen name="MapHome" component={MapScreen} />
      <MapStack.Screen name="MapLocationDetail" component={LocationDetailScreen} />
    </MapStack.Navigator>
  );
}

function PickStackNavigator() {
  return (
    <PickStack.Navigator screenOptions={stackOptions}>
      <PickStack.Screen name="HornPickHome" component={HornPickScreen} />
      <PickStack.Screen name="QuizGame" component={QuizGameScreen} />
      <PickStack.Screen name="CrosswordGame" component={CrosswordGameScreen} />
    </PickStack.Navigator>
  );
}

function NotesStackNavigator() {
  return (
    <NotesStack.Navigator screenOptions={stackOptions}>
      <NotesStack.Screen name="NotesHome" component={NotesScreen} />
      <NotesStack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </NotesStack.Navigator>
  );
}

function SavedStackNavigator() {
  return (
    <SavedStack.Navigator screenOptions={stackOptions}>
      <SavedStack.Screen name="SavedHome" component={SavedScreen} />
      <SavedStack.Screen name="SavedLocationDetail" component={LocationDetailScreen} />
    </SavedStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen name="TrailsTab" component={TrailsStackNavigator} />
      <Tab.Screen name="MapTab" component={MapStackNavigator} />
      <Tab.Screen name="PickTab" component={PickStackNavigator} />
      <Tab.Screen name="NotesTab" component={NotesStackNavigator} />
      <Tab.Screen name="SavedTab" component={SavedStackNavigator} />
    </Tab.Navigator>
  );
}

function renderTabBar(props: BottomTabBarProps) {
  return <FloatingTabBar {...props} />;
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={stackOptions} initialRouteName="Loader">
        <RootStack.Screen name="Loader" component={LoaderScreen} />
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
        <RootStack.Screen name="Main" component={MainTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
