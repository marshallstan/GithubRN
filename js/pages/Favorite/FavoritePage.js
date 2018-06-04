import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import WebViewTest from '../../common/WebViewTest';

export default class FavoritePage extends Component {
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
          title="Favorite"
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
        <WebViewTest />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  }
});