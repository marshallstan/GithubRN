import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import NavigationBar from './NavigationBar';

export default class Boy extends Component {
  componentDidMount(){
    this.props.navigation.setParams({
      navigatePress:this.navigatePress
    })
  }
  static renderButton(image) {
    return (
      <TouchableOpacity>
        <Image
          style={{width: 23, height: 23}}
          source={image} />
      </TouchableOpacity>
    );
  };
  static navigationOptions = ({navigation, screenProps}) => ({
    header: (
      <NavigationBar
        title="Boy"
        statusBar={{
          backgroundColor: '#ee6363'
        }}
        leftButton={
          Boy.renderButton(require('../res/images/ic_arrow_back_white_36pt.png'))
        }
        rightButton={
          Boy.renderButton(require('../res/images/ic_star.png'))
        }
        style={{
          backgroundColor: '#ee6363'
        }} />
    ),
  });
  render() {
    const { params } = this.props.navigation.state;
    const word = params ? params.word : null;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>I am a boy</Text>
        <Text
          style={styles.text}
          onPress={()=>{
            this.props.navigation.navigate('Girl', {word: '一枝玫瑰'})
          }}>
          send girl a rose.
        </Text>
        <Text style={styles.text}>{word}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  }
});