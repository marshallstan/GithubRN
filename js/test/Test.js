import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Test extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20
  }
});