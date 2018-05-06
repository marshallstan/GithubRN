import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Boy extends Component {
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