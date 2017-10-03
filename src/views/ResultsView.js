/**
 * Results View
 * https://github.com/nmoya/hltb-mobile-app.git
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Linking,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import C from '../constants';

export default class ResultsView extends Component {
  static navigationOptions = {
    title: 'Search results',
  };
  constructor(props) {
    super(props);
    this.state = {
      games: props.navigation.state.params.games,
    };
  }

  renderTime = (time, i) => {
    return (
      <Text style={styles.baseCategory} key={i}>{ `${time.category}: ${time.time}` }</Text>
    );
  }

  renderTimes = (game) => {
    return game.times.map((time, i) => this.renderTime(time, i));
  }

  renderGame = ({item}) => {
    return (
      <View style={[C.styles.row, styles.baseGame]}>
        <Image style={styles.gameCover} source={{uri: item.img}}/>
        <View style={[C.styles.column, styles.baseTimeView]}>
          <Text style={styles.gameTitle}>{ item.title }</Text>
          <Text>{'\n\n'}</Text>
          { this.renderTimes(item) }
        </View>
      </View>
    );
  }

  renderSeparator = () => {
    return null;
  }

  render() {
    return (
      <View style={[C.styles.rootContainer, C.styles.column]}>
        <FlatList
          data={this.state.games}
          renderItem={this.renderGame}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={item => item.id}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseGame: {
    justifyContent: 'flex-start',
    marginBottom: C.sizes.padding,
    marginRight: C.sizes.padding,
  },
  gameCover: {
    width: 170,
    height: 220,
    marginRight: C.sizes.padding,
  },
  baseTimeView: {
    flex: 1,
    flexWrap: 'wrap'
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  baseTime: {
  },
  baseCategory: {
    marginTop: 3,
  },
});
