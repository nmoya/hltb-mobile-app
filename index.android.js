/**
 * How Long To Beat
 * https://github.com/nmoya/hltb-mobile-app.git
 * @flow
 */

import { AppRegistry } from 'react-native';
import HomeView from './src/views/HomeView';
import AboutView from './src/views/AboutView';

import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
  Main: {screen: HomeView},
  About: {screen: AboutView},
});

AppRegistry.registerComponent('hltb', () => App);
