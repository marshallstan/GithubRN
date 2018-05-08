import React from 'react';
import {
  StackNavigator
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

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
    headerMode: 'screen',
    transitionConfig: ()=>({
      screenInterpolator:CardStackStyleInterpolator.forHorizontal
    })
  }
);
