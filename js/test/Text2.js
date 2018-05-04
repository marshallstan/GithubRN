import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Text2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Text2</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  }
});