/**
 * Home View
 * https://github.com/nmoya/hltb-mobile-app.git
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';

import C from '../constants';
import HltbRequester from '../networking/HltbRequester';
import Button from '../generic/react-native-buttons';

const ICON = require('../assets/img/hltb_icon.png');

export default class HomeView extends Component {
  static navigationOptions = {
    title: 'How Long To Beat',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      query: null,
      submitDisabled: true,
      isLoading: false,
    };
  }

  render() {
    return (
      <View style={[C.styles.rootContainer, C.styles.spaceBetween]}>
        <View style={[C.styles.row, C.styles.center]}>
          <Image source={ICON} style={styles.iconSize} />
          <Text style={C.styles.h1}>{'How Long To Beat?'}</Text>
        </View>
        {this.renderTextInput()}
        <Text
          style={C.styles.h4}
          onPress={this.onAbout}>{'About'}</Text>
      </View>
    );
  }

  renderTextInput() {
    return (
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          autoCapitalize={'words'}
          autoCorrect={false}
          autoFocus={false}
          underlineColorAndroid={C.colors.black}
          returnKeyType={'search'}
          placeholder={'Search for games ...'}
          onChangeText={this.onTextChange}
          onSubmitEditing={this.onSubmit}
        />
        <Button
          onPress={this.onSubmit}
          type='surface'
          size='small'
          theme='default'
          disableColor={C.colors.gray}
          selfStyle={styles.submitButton}
          isLoading={this.state.isLoading}
          loadingTitle='Loading'
          disabled={this.state.submitDisabled}>
          Search
        </Button>
      </View>
    );
  }

  onTextChange = (text) => {
    this.setState({ query: text, submitDisabled: text === '' });
  }

  onSubmit = () => {
    if (!this.state.query || this.state.query.length === 0) return;
    Keyboard.dismiss();
    this.setState({ isLoading: true });
    HltbRequester.fetchAndParse(this.state.query)
      .then((games) => {
        this.props.navigation.navigate('Results', { games: games });
      })
      .catch((error) => {
        Alert.alert('Ooops!', `An error has occurred, please let me know via Twitter (@nikolasmoya).\n\n${error}`);
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  onAbout = () => {
    this.props.navigation.navigate('About');
  }
}

const styles = StyleSheet.create({
  iconSize: {
    width: 100,
    height: 100,
    marginRight: C.sizes.padding,
  },

  textInputContainer: {
    height: C.sizes.defaultHeight,
    flexDirection: 'row',
  },

  textInput: {
    flex: 1,
    marginRight: C.sizes.smallPadding,
    borderWidth: 0,
    borderColor: C.colors.black,
  },

  submitButton: {
    height: C.sizes.defaultHeight,
  },

});
