/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';

function Root() {
  const App = require('./App').default;
  return React.createElement(App);
}

AppRegistry.registerComponent(appName, () => Root);
