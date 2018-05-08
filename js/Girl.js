import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import NavigationBar from './NavigationBar';

export default class Girl extends Component {
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
          title="Girl"
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
        <Text style={styles.text}>I am a girl</Text>
        <Text style={styles.text}>我收到了：{word}</Text>
        <Text
          style={styles.text}
          onPress={()=>{
            this.props.navigation.navigate('Boy', {word: '一盒巧克力'});
          }}>
          回赠巧克力
        </Text>
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
    fontSize: 22
  }
});