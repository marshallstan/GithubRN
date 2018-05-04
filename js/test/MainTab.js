import React,{ Component } from 'react';
import Home from './Home';
import TestTow  from './Text2';
import TabBarItem from './TabBarItem'

import {TabNavigator,TabBarBottom} from 'react-navigation';

export const MainTab = TabNavigator(
  {
    Home:{
      screen:Home,
      navigationOptions:({navigation}) => ({
        tabBarLabel:'首页',
        tabBarIcon:({focused,tintColor}) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../../res/images/ic_polular.png')}
            selectedImage={require('../../res/images/ic_polular.png')}
          />
        )
      }),
    },

    TestTow:{
      screen:TestTow,
      navigationOptions:({navigation}) => ({
        tabBarLabel:'我',
        tabBarIcon:({focused,tintColor}) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../../res/images/ic_trending.png')}
            selectedImage={require('../../res/images/ic_trending.png')}
          />
        )
      }),
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#06c1ae',
      inactiveTintColor: '#979797',
      style: {
        backgroundColor: '#ffffff'
      }
    }
  }
);
