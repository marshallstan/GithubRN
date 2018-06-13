import React, {Component} from 'react';
import {Routers} from './js/pages/Router';
import {MenuProvider} from 'react-native-popup-menu';

export default class App extends Component {
  render() {
    return (
      <MenuProvider>
        <Routers />
      </MenuProvider>
    );
  }
}