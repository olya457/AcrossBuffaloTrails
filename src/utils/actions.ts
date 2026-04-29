import {Linking, Platform, Share} from 'react-native';
import type {LocationItem} from '../types';

export async function openExternalMap(location: LocationItem) {
  const {latitude, longitude} = location.coordinates;
  const label = encodeURIComponent(location.title);
  const url =
    Platform.OS === 'ios'
      ? `https://maps.apple.com/?daddr=${latitude},${longitude}&q=${label}`
      : `google.navigation:q=${latitude},${longitude}`;

  const supported = await Linking.canOpenURL(url);
  await Linking.openURL(
    supported
      ? url
      : `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
  );
}

export async function shareLocation(location: LocationItem) {
  const {latitude, longitude} = location.coordinates;
  await Share.share({
    title: location.title,
    message: `${location.title}\n${location.description}\n${location.address}\nhttps://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
  });
}
