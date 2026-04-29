import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SavedProvider} from './src/context/SavedContext';
import {AppNavigator} from './src/navigation/AppNavigator';
import {colors} from './src/theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SavedProvider>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <AppNavigator />
      </SavedProvider>
    </SafeAreaProvider>
  );
}

export default App;
