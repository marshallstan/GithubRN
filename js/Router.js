import React from 'react';
import {
  StackNavigator
} from 'react-navigation';
import {View, Button, Text} from 'react-native';

import Boy from './Boy';
import Girl  from './Girl';

export const  Routers = StackNavigator(
  {
    Boy:{
      screen: Boy,
      navigationOptions: {
        title: 'Boy',
        headerTitleStyle: {
          color: 'red',
          backgroundColor: 'green'
        }
      }
    },
    Girl:{
      screen: Girl,
      navigationOptions: {
        headerTitle: 'Girl',
        headerTitleStyle: {
          alignSelf: 'center'
        }
      },
    }
  }
);
