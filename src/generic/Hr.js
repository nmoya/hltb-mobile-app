/**
 * Hr component
 * https://github.com/nmoya/hltb-mobile-app.git
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import C from '../constants';

export default class Hr extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({

});
