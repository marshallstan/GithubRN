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
import Toast from 'react-native-root-toast';

const KEY = 'test';

export default class AsyncStorageTest extends Component {
  constructor() {
    super();
    this.state = {
      toasting: false
    };
  }
  showToast = msg => {
    if (!this.state.toasting) {
      Toast.show(msg, {
        duration: 1800,
        position: -80,
        shadow: true,
        animation: true,
        hideOnPress: true,
        onShow: () => {
          this.setState({toasting: true});
        },
        onHidden: () => {
          this.setState({toasting: false});
        },
      });
    }
  };
  onSave = () => {
    AsyncStorage.setItem(KEY, this.text, err=>{
      if (!err) this.showToast('保存成功');
      else this.showToast('保存失败');
    })
  };
  onRemove = () => {
    AsyncStorage.removeItem(KEY, err=>{
      if (!err) this.showToast('移除成功');
      else this.showToast('移除失败');
    })
  };
  onFetch = () => {
    AsyncStorage.getItem(KEY, (err, res)=>{
      if (!err) {
        if (res) this.showToast('res: ' + res);
        else this.showToast('不存在此KEY');
      } else this.showToast('获取失败');
    })
  };
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
