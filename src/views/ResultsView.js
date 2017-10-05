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
import Markdown from 'react-native-simple-markdown';
import Hr from '../generic/Hr';

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
    const timeStr = time.time.replace(" Hours", "h").replace("½", ".5");
    const category = time.category;
    return (
      <View style={[C.styles.row, styles.timeContainerView]} key={i}>
        <View style={styles.categoryView}>
          <Markdown>**{ category }**</Markdown>
        </View>
        <View>
          <Text style={styles.timeStyle}>{ timeStr }</Text>
        </View>
      </View>
    );
  }

  renderTimes = (game) => {
    return game.times.map((time, i) => this.renderTime(time, i));
  }

  renderGame = ({item}) => {
    return (
      <View style={[C.styles.row, styles.baseGame]}>
        <TouchableWithoutFeedback onPress={this.openUrl(item.gameUrl)}>
          <Image style={styles.gameCover} source={{uri: item.img}}/>
        </TouchableWithoutFeedback>
        <View style={[C.styles.column, styles.baseTimeView]}>
          <Text style={styles.gameTitle} onPress={this.openUrl(item.gameUrl)}>{ item.title }</Text>
          <Text>{'\n'}</Text>
          { this.renderTimes(item) }
        </View>
      </View>
    );
  }

  openUrl = (url) => {
    return () => {
      Linking.openURL(url);
    }
  }

  renderSeparator = () => {
    return (
      <Hr/>
    );
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
    marginTop: C.sizes.padding,
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
    fontSize: 18,
  },
  timeContainerView: {
    flex: 1,
    alignItems: 'center',
  },
  timeStyle: {
    alignItems: 'flex-end',
  },
  categoryView: {
    width: 100,
  }
});
