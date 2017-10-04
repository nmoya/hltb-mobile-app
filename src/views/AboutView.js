/**
 * Home View
 * https://github.com/nmoya/hltb-mobile-app.git
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import C from '../constants';
import Markdown from 'react-native-simple-markdown';
const pjson = require('../../package.json');

export default class AboutView extends Component {
  static navigationOptions = {
    title: 'About',
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
      <View style={[C.styles.rootContainer]}>
      <Markdown>
        First of all, thanks to [How Long to Beat](http://howlongtobeat.com) for providing such an awesome service. All
        credit belongs to them. You are encouraged to [donate](https://howlongtobeat.com/donate.php) in their website.{'\n\n'}

        This is a open-source, unofficial, and non-commercial mobile app for How Long To Beat. The code base of this
        project is hosted on [GitHub](https://github.com/nmoya/hltb-mobile-app.git). Feel free to contribute with issues
        and Pull Requests.{'\n\n'}

        This project is mainly maintained by [Nikolas Moya](http://nikolasmoya.com), computer scientist and a lazy
        gamer who wanted a minimalistic interface to check game stats.{'\n\n'}
      </Markdown>
      <View style={[C.styles.column, styles.marginTop]}>
        <Text style={styles.imageLabel}>Visit the official website: </Text>
        <TouchableWithoutFeedback onPress={this.onHLTBLogo}>
          <Image source={require('../assets/img/hltb_logo.png')} style={styles.iconSize} />
        </TouchableWithoutFeedback>
        <Text style={styles.imageLabel}>Share this app: </Text>
        <TouchableWithoutFeedback onPress={this.onPlayStoreLogo}>
          <Image source={require('../assets/img/play_icon.png')} style={styles.iconSize} />
        </TouchableWithoutFeedback>
        <Text style={styles.imageLabel}>Contribute to this project: </Text>
        <TouchableWithoutFeedback onPress={this.onGithubLogo}>
          <Image source={require('../assets/img/github_icon.png')} style={styles.iconSize} />
        </TouchableWithoutFeedback>
      </View>
      <Text> App version: { pjson.version } </Text>
      </View>
      </ScrollView>
    );
  }

  onGithubLogo() {
    Linking.openURL('https://github.com/nmoya/hltb-mobile-app.git');
  }

  onPlayStoreLogo() {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.nikolasmoya.hltb');
  }

  onHLTBLogo() {
    Linking.openURL('https://howlongtobeat.com');
  }
}

const styles = StyleSheet.create({
  iconSize: {
    width: 80,
    height: 80,
    marginRight: C.sizes.padding,
    resizeMode: 'contain',
  },

  marginTop: {
    marginTop: 10,
  },
  imageLabel: {
    marginTop: 10,
  }
});
