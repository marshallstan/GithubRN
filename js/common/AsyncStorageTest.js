import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  TextInput
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
const KEY = 'test';

export default class AsyncStorageTest extends Component {
  onSave = () => {
    // alert(111)
    // this.toast.show('666', DURATION.LENGTH_SHORT)
    AsyncStorage.setItem(KEY, this.text, err=>{
      // alert(222)
      if (!err) {
        // this.toast.show('保存成功', DURATION.LENGTH_SHORT)
        alert(this.toast)
      } else {
        // this.toast.show('保存失败', DURATION.LENGTH_SHORT)
        alert(444)
      }
    })
  };
  onRemove = () => {};
  onFetch = () => {};
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={text=>this.text = text}
          underlineColorAndroid='transparent' />
        <View style={{flexDirection: 'row', margin: 10}}>
          <Text style={styles.tips} onPress={this.onSave}>保存</Text>
          <Text style={styles.tips} onPress={this.onRemove}>移除</Text>
          <Text style={styles.tips} onPress={this.onFetch}>取出</Text>
        </View>
        <Toast ref={toast=>{this.toast=toast}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 10,
  },
  tips: {
    margin: 8,
  }
});
