import React from 'react';
import {
  StackNavigator
} from 'react-navigation';

import Boy from './Boy';
import Girl  from './Girl';

export const  Routers = StackNavigator(
  {
    Boy:{
      screen: Boy
    },
    Girl:{
      screen: Girl
    }
  }, {
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'gray'
      }
    }
  }
);
