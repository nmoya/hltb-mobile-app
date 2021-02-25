/**
 * How Long To Beat
 * https://github.com/nmoya/hltb-mobile-app.git
 * @flow
 */

import { AppRegistry } from 'react-native';
import HomeView from './src/views/HomeView';
import AboutView from './src/views/AboutView';
import ResultsView from './src/views/ResultsView';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const RootStack = createStackNavigator({
  Main: {screen: HomeView},
  About: {screen: AboutView},
  Results: {screen: ResultsView}},
  {
    headerMode: 'screen'
  });

AppRegistry.registerComponent('hltb', () => createAppContainer(RootStack));
