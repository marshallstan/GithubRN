import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';

export default class TestContainer extends Component{
  render() {
    return (
      <View>
        <Text
          onPress={()=>{
            this.props.navigation.navigate("CustomKeyPage", {
              flag: FLAG_LANGUAGE.flag_key
            })
          }}
          style={styles.text}>
          key
        </Text>
        <Text
          onPress={()=>{
            this.props.navigation.navigate("CustomKeyPage", {
              flag: FLAG_LANGUAGE.flag_language
            })
          }}
          style={styles.text}>
          language
        </Text>
        <Text
          onPress={()=>{
            this.props.navigation.navigate("SortKeyPage", {
              flag: FLAG_LANGUAGE.flag_key
            })
          }}
          style={styles.text}>
          key sort
        </Text>
        <Text
          onPress={()=>{
            this.props.navigation.navigate("SortKeyPage", {
              flag: FLAG_LANGUAGE.flag_language
            })
          }}
          style={styles.text}>
          language sort
        </Text>
        <Text
          onPress={()=>{
            this.props.navigation.navigate("CustomKeyPage", {
              isRemoveKey: true
            })
          }}
          style={styles.text}>
          key delete
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'green'
  }
});
