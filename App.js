/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Routers} from './js/test/Router';
import {StackNavigator} from 'react-navigation';
import Boy from './js/Boy'
import Girl from './js/Girl'
// import Tab from './js/Tab'

// const RootStack = StackNavigator(
//   {
//     Boy: {screen: Boy},
//     Girl: {screen: Girl}
//   }, {
//     initialRouteName: 'Boy',
//   }
// );
//
// const Navigator = StackNavigator(
//   {
//     Tab: {screen: Tab},
//     Product: {screen: ProductScreen}
//   }, {
//     navigationOptions: {
//       headerBackTitle: null,
//       headerTintColor: '#333333',
//       showIcon: true,
//       swipeEnabled: false,
//       animationEnabled: false,
//     }
//   });

export default class App extends React.Component {
  render() {
    return <Routers screenProps={{themeColor:'rgb(45,158,163)',tinkColor:'white'}}/>;
  }
}