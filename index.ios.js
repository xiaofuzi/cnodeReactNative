/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import IndexApp from './components/ios/index.js';

class cnodeReactNative extends Component {
  render() {
    return (<IndexApp style={styles.container} />);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('cnodeReactNative', () => cnodeReactNative);
