import React,{Component} from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import Home from './Home';
import App from './App';
import Test  from './Test';
import {MainTab} from './MainTab';

// 初始化StackNavigator
export const  Routers = StackNavigator(
  {
    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    App:{
      screen:App,
    },
    MainTab:{
      screen:MainTab,
    },
    Home:{
      screen:Home,
    },
    Test:{
      screen:Test,
    },
  },
  {
    initialRouteName: 'MainTab'
  }
);
