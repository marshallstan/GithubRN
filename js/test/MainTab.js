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
        labelStyle:{
          fontSize:10,
          color:'red'
        },
        activeTintColor:'red',
        activeBackgroundColor:'yellow',
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
    tabBarComponent:TabBarBottom,
    tabBarPosition:'bottom',
    swipeEnabled:false, //不允许滑动切换Tab
    animationEnabled:false,
    lazy:true,//允许懒加载
    tabBarOptions:{
      activeTintColor:'#06c1ae',
      inactiveTintColor:'#979797',
      style:{backgroundColor:'#ffffff',

      },
      labelStyle: {
        fontSize: 20, // 文字大小
      },
    }
  }
);
