import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Girl extends Component {
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
    justifyContent: 'center'
  },
  text: {
    fontSize: 22
  }
});