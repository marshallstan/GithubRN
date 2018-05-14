import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../common/NavigationBar';

export default class TrendingPage extends Component {
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
          title="Trending"
          leftButton={
            renderButton(require('../../res/images/ic_arrow_back_white_36pt.png'))
          }
          rightButton={
            renderButton(require('../../res/images/ic_star.png'))
          } />
      ),
    };
  };
  render() {
    return (
      <View style={styles.page}>
        <Text style={styles.text}>趋势</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: 'yellow'
  }
});