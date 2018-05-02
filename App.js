/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import Boy from './js/Boy'
import Girl from './js/Girl'

const RootStack = StackNavigator(
  {
    Boy: {screen: Boy},
    Girl: {screen: Girl}
  }, {
    initialRouteName: 'Boy',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}