import React from 'react';
import {
  StackNavigator
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import Boy from './Boy';
import Girl  from './Girl';
import FlatListTest  from './FlatListTest';
import FetchTest  from './FetchTest';

export const  Routers = StackNavigator(
  {
    Boy:{
      screen: Boy
    },
    Girl:{
      screen: Girl
    },
    FlatListTest:{
      screen: FlatListTest
    },
    FetchTest:{
      screen: FetchTest
    }
  }, {
    initialRouteName: 'FetchTest',
    headerMode: 'screen',
    transitionConfig: ()=>({
      screenInterpolator:CardStackStyleInterpolator.forHorizontal
    })
  }
);
