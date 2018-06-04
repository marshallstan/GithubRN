import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView,
  TextInput
} from 'react-native';
import Toast from 'react-native-root-toast';

const URL = 'http://www.imooc.com';

export default class WebViewTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: URL,
      title: '',
      canGoBack: false,
      toasting: false
    };
  }
  componentDidMount() {
    this.toastingConfig = {
      duration: 500,
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
    };
  }
  goBack = () => {
    if (this.state.canGoBack) this.webView.goBack();
    else !this.state.toasting && Toast.show('Already Top!', this.toastingConfig);
  };
  go = () => {
    this.setState({url: this.text});
  };
  onNavigationStateChange = e => {
    this.setState({
      canGoBack: e.canGoBack,
      title: e.title,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text
            style={styles.tips}
            onPress={this.goBack}>Back</Text>
          <TextInput
            defaultValue={URL}
            onChangeText={text=>this.text = text}
            underlineColorAndroid='transparent'
            style={styles.input} />
          <Text
            style={styles.tips}
            onPress={this.go}>Go</Text>
        </View>
        <WebView
          ref={webView=>this.webView=webView}
          onNavigationStateChange={e=>this.onNavigationStateChange(e)}
          source={{uri: this.state.url}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  tips: {
    fontSize: 20,
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    margin: 8,
  }
});
