/**
 * How Long To Beat
 * https://github.com/nmoya/hltb-android-app
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import HomeView from './src/views/HomeView';

export default class HLTB extends Component {
  render() {
    return (
      <HomeView />
    );
  }
}

AppRegistry.registerComponent('hltb', () => HLTB);
