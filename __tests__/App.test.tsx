/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-webview', () => {
  const MockReact = require('react');
  const {View} = require('react-native');

  return {
    WebView: (props: object) => MockReact.createElement(View, props),
  };
});

jest.mock('react-native-maps', () => {
  const MockReact = require('react');
  const {View} = require('react-native');
  const MapView = MockReact.forwardRef((props: object, ref: object) =>
    MockReact.createElement(View, {...props, ref}),
  );

  return {
    __esModule: true,
    default: MapView,
    Marker: (props: object) => MockReact.createElement(View, props),
  };
});

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
