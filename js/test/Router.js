import React,{Component} from 'react';
import {
  StackNavigator
} from 'react-navigation';
import {View, Button, Text} from 'react-native';

import Home from './Home';
import App from './App';
import Test  from './Test';
import {MainTab} from './MainTab';

export const  Routers = StackNavigator(
  {
    App:{
      screen:App,
      navigationOptions: {
        // header: null,
        headerTitle: 'App'
      }
    },
    MainTab:{
      screen:MainTab,
      navigationOptions: {
        // header: null,
        title: 'MainTab',
        // headerTitle: 'MainTab'
      },
    },
    Home:{
      screen:Home,
      navigationOptions: {
        header: null
      },
    },
    Test:{
      screen:Test,
      navigationOptions: {
        header: null
      },
    },
  },
  {
    // initialRouteName: 'MainTab',
    navigationOptions: {
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        color: 'green'
      },
      headerRight: (
        <View style={{height: 44,width: 55,justifyContent: 'center',paddingRight:15} }/>
      )
    }
  }
);
