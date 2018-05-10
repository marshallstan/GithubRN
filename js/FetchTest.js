import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import NavigationBar from './NavigationBar';
import axios from 'axios';

export default class FetchTest extends Component {
  constructor() {
    super();
    this.state = {
      result: ''
    }
  }
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
          title="FetchTest"
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
  onLoad = url => {
    axios.get(url)
      .then(res=>{
        let result = JSON.stringify(res.data);
        this.setState({result})
      })
      .catch(err=>{this.setState({result: JSON.stringify(err)})})
  };
  onSubmit = (url, data) => {
    axios.post(url, data)
      .then(res=>{
        let result = JSON.stringify(res.data);
        this.setState({result});
      })
      .catch(err=>{this.setState({result: JSON.stringify(err)})})
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.text}
          onPress={()=>{
            this.onLoad('http://rap2api.taobao.org/app/mock/12933/tset')
          }}>
          获取数据
        </Text>
        <Text
          style={styles.text}
          onPress={()=>{
            this.onSubmit('http://rap2api.taobao.org/app/mock/12933/submit', {
              userName: 'xiaoming',
              password: '132'
            })
          }}>
          提交数据
        </Text>
        <Text style={{}}>返回结果: {this.state.result}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20
  }
});