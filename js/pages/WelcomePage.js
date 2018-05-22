import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class WelcomePage extends Component {
  componentDidMount() {
    this.timer = setTimeout(()=>{
      this.props.navigation.navigate("HomePage");
    }, 500)
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text
          onPress={()=>{
            this.props.navigation.navigate("HomePage")
          }}
          style={styles.text}>
          欢迎
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
    fontSize: 20
  }
});