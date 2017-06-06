/**
 * Home View
 * https://github.com/nmoya/hltb-android-app
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';

import C from '../constants';

const ICON = require('../assets/img/hltb_icon.png');

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = { query: null };
  }
  render() {
    console.log(this.state);
    return (
      <View style={[C.styles.rootContainer, C.styles.spaceBetween]}>
        <View style={[C.styles.row, C.styles.center]}>
          <Image source={ICON} style={styles.iconSize}/>
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
          returnKeyType={'search'}
          placeholder={'Search for games ...'}
          onChangeText={(text) => this.setState({query: text})}
          onSubmitEditing={this.onSubmit.bind(this)}
        />
        <View style={[styles.submitButton, C.styles.center]}>
          <Text>{'Search'}</Text>
        </View>
      </View>
    );
  }

  onSubmit() {
    console.log('Submitted with text ' + this.state.query);
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
  },

  submitButton: {
    padding: C.sizes.smallPadding,
    backgroundColor: C.colors.gray,
  },

});