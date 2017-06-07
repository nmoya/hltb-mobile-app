/**
 * Home View
 * https://github.com/nmoya/hltb-mobile-app.git
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
import Button from 'react-native-buttons';

const ICON = require('../assets/img/hltb_icon.png');

export default class HomeView extends Component {
  static navigationOptions = {
    title: 'How Long To Beat',
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
          <Image source={ICON} style={styles.iconSize}/>
          <Text style={C.styles.h1}>{'How Long To Beat?'}</Text>
        </View>
        {this.renderTextInput()}
        <Text
          style={C.styles.h4}
          onPress={this.onAbout.bind(this)}>{'About'}</Text>
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
          onChangeText={this.onTextChange.bind(this)}
          onSubmitEditing={this.onSubmit.bind(this)}
        />
        <Button
          onPress={this.onSubmit.bind(this)}
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

  onTextChange(text) {
    this.setState({query: text, submitDisabled: text === ''});
  }

  onSubmit() {
    if (!this.state.query) return;
    this.setState({isLoading: true});
    fetch('http://howlongtobeat.com')
      .then((response) => {
        console.log(response);
        this.setState({isLoading: false});
      })
      .catch((response) => {
        console.log(response);
        this.setState({isLoading: false});
      });
    console.log('Submitted with text ' + this.state.query);
  }

  onAbout() {
    // Not working on Android
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