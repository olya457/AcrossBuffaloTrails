import AsyncStorage from '@react-native-async-storage/async-storage';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {appImages} from '../data/assets';
import {colors, radii, storageKeys} from '../theme';
import type {RootStackParamList} from '../types';
import {useCompactLayout} from '../utils/layout';

type LoaderScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Loader'>;
};

const loaderHtml = `
<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  html, body {
    margin: 0;
    padding: 0;
    background: transparent;
    color: #fff8f0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    overflow: hidden;
  }
  .card {
    height: 48px;
    border-radius: 18px;
    padding: 0 16px;
    background: linear-gradient(120deg, rgba(36, 16, 8, .88), rgba(111, 55, 24, .84));
    border: 1px solid rgba(255, 210, 130, .28);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .line {
    width: 100%;
    height: 6px;
    border-radius: 99px;
    background: rgba(255, 255, 255, .18);
    overflow: hidden;
  }
  .fill {
    width: 44%;
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, #ffb32c, #ff7a0b);
    animation: move 1.35s ease-in-out infinite alternate;
  }
  @keyframes move {
    from { transform: translateX(0); }
    to { transform: translateX(118%); }
  }
</style>
</head>
<body>
  <div class="card">
    <div class="line"><div class="fill"></div></div>
  </div>
</body>
</html>
`;

const WebViewComponent = (() => {
  try {
    return require('react-native-webview').WebView;
  } catch {
    return null;
  }
})();

export function LoaderScreen({navigation}: LoaderScreenProps) {
  const insets = useSafeAreaInsets();
  const {isCompact} = useCompactLayout();
  const webWrapStyle = [
    styles.webWrap,
    isCompact && styles.webWrapCompact,
    styles.webWrapBottom,
    Platform.OS === 'ios' && {bottom: insets.bottom + 20},
  ];

  useEffect(() => {
    const timer = setTimeout(async () => {
      const seen = await AsyncStorage.getItem(storageKeys.onboardingSeen);
      navigation.replace(seen ? 'Main' : 'Onboarding');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={appImages.splashLoader} style={styles.root} resizeMode="cover">
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <View style={webWrapStyle}>
        {WebViewComponent ? (
          <WebViewComponent
            originWhitelist={['*']}
            source={{html: loaderHtml}}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.webView}
            containerStyle={styles.webContainer}
          />
        ) : (
          <View style={[styles.webFallback, isCompact && styles.webFallbackCompact]}>
            <View style={styles.webFallbackTrack}>
              <View style={styles.webFallbackFill} />
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  webWrap: {
    position: 'absolute',
    left: 24,
    right: 24,
    height: 48,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  webWrapCompact: {
    left: 18,
    right: 18,
  },
  webWrapBottom: {
    bottom: 30,
  },
  webContainer: {
    backgroundColor: 'transparent',
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webFallback: {
    flex: 1,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(40, 17, 8, 0.88)',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  webFallbackCompact: {
    paddingHorizontal: 14,
  },
  webFallbackTrack: {
    height: 6,
    borderRadius: 99,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  webFallbackFill: {
    width: '58%',
    height: '100%',
    borderRadius: 99,
    backgroundColor: colors.accent,
  },
});
