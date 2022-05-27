import {
  StyleSheet,
} from 'react-native';

const colors = {
  gray: '#cecece',
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  black: '#000000',
  white: '#ffffff',
};

const sizes = {
  padding: 10,
  smallPadding: 7,
  defaultHeight: 40,
  h1: 24,
  h2: 22,
  h3: 20,
  h4: 14,
  h5: 12,
};

const styles = StyleSheet.create({

  rootContainer: {
    flex: 1,
    padding: sizes.padding,
    borderWidth: 0,
    borderColor: colors.black,
  },

  row: {
    flexDirection: 'row',
  },

  column: {
    flexDirection: 'column',
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  spaceBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  flexStart: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  flexEnd: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  h1: {
    fontSize: sizes.h1,
  },

  h2: {
    fontSize: sizes.h2,
  },

  h3: {
    fontSize: sizes.h3,
  },

  h4: {
    fontSize: sizes.h4,
  },

  h5: {
    fontSize: sizes.h5,
  },

});

module.exports = {
  colors: colors,
  sizes: sizes,
  styles: styles,
};
