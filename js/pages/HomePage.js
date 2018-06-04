import React from 'react';
import PopularPage from './Popular/PopularPage';
import TrendingPage from './Trending/TrendingPage';
import FavoritePage from './Favorite/FavoritePage';
import MyPage from './My/MyPage';
import TabBarItem from '../common/TabBarItem'

import {TabNavigator, TabBarBottom} from 'react-navigation';

export const HomePage = TabNavigator(
  {
    TabPopular: {
      screen: PopularPage,
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
      screen: TrendingPage,
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
      screen: FavoritePage,
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
      screen: MyPage,
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
    initialRouteName: 'TabPopular',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#2196f3',
      inactiveTintColor: '#979797',
      style: {
        backgroundColor: '#ffffff'
      }
    }
  }
);
