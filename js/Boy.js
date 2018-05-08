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
          title="Boy"
          statusBar={{
            backgroundColor: '#ee6363'
          }}
          leftButton={
            renderButton(require('../res/images/ic_arrow_back_white_36pt.png'))
          }
          rightButton={
            renderButton(require('../res/images/ic_star.png'))
          }
          style={{
            backgroundColor: '#ee6363'
          }} />
      ),
    };
  };
  componentDidMount(){
    this.props.navigation.setParams({})
  }
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