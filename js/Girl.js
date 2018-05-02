import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Girl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ''
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>I am a girl</Text>
        <Text
          style={styles.text}
          onPress={word=>{
            this.setState({word});
          }}>

        </Text>
        <Text style={styles.text}>{this.state.word}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center'
  },
  text: {
    fontSize: 22
  }
});