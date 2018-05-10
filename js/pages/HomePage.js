import React,{ Component } from 'react';
import TabPopular from './TabPopular';
import TabTrending from './TabTrending';
import TabFavorite from './TabFavorite';
import TabMy from './TabMy';
import TabBarItem from '../common/TabBarItem'

import {TabNavigator,TabBarBottom} from 'react-navigation';

export const HomePage = TabNavigator(
  {
    TabPopular: {
      screen: TabPopular,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '热门',
        tabBarIcon: ({focused, tintColor}) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../../res/images/ic_polular.png')}
            selectedImage={require('../../res/images/ic_polular.png')}
          />
        )
      }),
    },
    TabTrending: {
      screen: TabTrending,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '趋势',
        tabBarIcon: ({focused, tintColor}) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../../res/images/ic_trending.png')}
            selectedImage={require('../../res/images/ic_trending.png')}
          />
        )
      }),
    },
    TabFavorite: {
      screen: TabFavorite,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '收藏',
        tabBarIcon: ({focused, tintColor}) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../../res/images/ic_favorite.png')}
            selectedImage={require('../../res/images/ic_favorite.png')}
          />
        )
      }),
    },
    TabMy: {
      screen: TabMy,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({focused, tintColor}) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('../../res/images/ic_my.png')}
            selectedImage={require('../../res/images/ic_my.png')}
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
