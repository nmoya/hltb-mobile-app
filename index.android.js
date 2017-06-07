/**
 * How Long To Beat
 * https://github.com/nmoya/hltb-mobile-app.git
 * @flow
 */

import { AppRegistry } from 'react-native';
import HomeView from './src/views/HomeView';

import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
  Main: {screen: HomeView},
});

AppRegistry.registerComponent('hltb', () => App);
