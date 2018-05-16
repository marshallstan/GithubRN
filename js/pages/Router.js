import React from 'react';
import {
  StackNavigator
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import WelcomePage from './WelcomePage';
import {HomePage} from './HomePage';
import CustomKeyPage from './My/CustomKeyPage';

export const Routers = StackNavigator(
  {
    WelcomePage:{
      screen: WelcomePage,
      navigationOptions: {
        header: null
      }
    },
    HomePage:{
      screen: HomePage
    },
    CustomKeyPage:{
      screen: CustomKeyPage
    }
  }, {
    initialRouteName: 'WelcomePage',
    headerMode: 'screen',
    transitionConfig: ()=>({
      screenInterpolator:CardStackStyleInterpolator.forHorizontal
    })
  }
);
