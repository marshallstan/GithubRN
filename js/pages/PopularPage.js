import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import PopularTab from '../common/PopularTab'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

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
          statusBar={{
            backgroundColor: '#ee6363'
          }}
          leftButton={
            renderButton(require('../../res/images/ic_arrow_back_white_36pt.png'))
          }
          rightButton={
            renderButton(require('../../res/images/ic_star.png'))
          }
          style={{
            backgroundColor: '#ee6363'
          }} />
      ),
    };
  };
  render() {
    return (
      <View style={styles.page}>
        <ScrollableTabView renderTabBar={()=><ScrollableTabBar />}>
          <PopularTab tabLabel='Java'>Java</PopularTab>
          <PopularTab tabLabel='IOS'>IOS</PopularTab>
          <PopularTab tabLabel='Android'>Android</PopularTab>
          <PopularTab tabLabel='Javascript'>Javascript</PopularTab>
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