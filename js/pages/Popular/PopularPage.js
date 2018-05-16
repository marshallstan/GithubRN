import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import PopularTab from './PopularTab'
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";

export default class PopularPage extends Component {
  static navigationOptions = ({navigation}) => {
    let renderButton = image => (
      <TouchableOpacity onPress={()=>{navigation.goBack()}}>
        <Image
          style={{width: 23, height: 23, margin: 5}}
          source={image} />
      </TouchableOpacity>
    );
    return {
      header: (
        <NavigationBar
          title="Popular"
          leftButton={
            renderButton(require('../../../res/images/ic_arrow_back_white_36pt.png'))
          }
          rightButton={
            renderButton(require('../../../res/images/ic_star.png'))
          } />
      ),
    };
  };
  render() {
    return (
      <View style={styles.page}>
        <ScrollableTabView
          tabBarBackgroundColor='#2196f3'
          tabBarActiveTextColor='#fff'
          tabBarInactiveTextColor='mintcream'
          tabBarUnderlineStyle={{
            backgroundColor: '#e7e7e7',
            height: 2,
          }}
          renderTabBar={()=><DefaultTabBar />}>
          <PopularTab tabLabel='Java'>Java</PopularTab>
          <PopularTab tabLabel='IOS'>IOS</PopularTab>
          <PopularTab tabLabel='Android'>Android</PopularTab>
          <PopularTab tabLabel='Javascript'>Javascript</PopularTab>
          {/*<PopularTab tabLabel={{label: 'Java'}}>Java</PopularTab>*/}
          {/*<PopularTab tabLabel={{label: 'IOS'}}>IOS</PopularTab>*/}
          {/*<PopularTab tabLabel={{label: 'Android'}}>Android</PopularTab>*/}
          {/*<PopularTab tabLabel={{label: 'Javascript'}}>Javascript</PopularTab>*/}
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'red'
  }
});