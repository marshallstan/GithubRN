import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView,
  TextInput,
} from 'react-native';
import {getButton} from '../../util/ViewUtil';
import NavigationBar from '../../common/NavigationBar';

const PRE_URL = 'https://github.com/';

export default class RepositoryDetail extends Component {
  constructor(props) {
    super(props);
    let { params } = this.props.navigation.state;
    let item = params ? params.item : {};
    let url = item.html_url || PRE_URL + item.fullName;
    this.state = {
      url: url,
      canGoBack: false,
    };
  }
  static navigationOptions = ({navigation}) => {
    let { params } = navigation.state;
    let onBack = params ? params.onBack : ()=>{};
    let item = params ? params.item : {};
    let title = item.full_name || item.fullName;
    // let renderButton = image => (
    //   <TouchableOpacity onPress={()=>{navigation.goBack()}}>
    //     <Image
    //       style={{width: 23, height: 23, margin: 5}}
    //       source={image} />
    //   </TouchableOpacity>
    // );
    return {
      header: (
        <NavigationBar
          title={title}
          leftButton={
            getButton(onBack)
          }
          rightButton={
            // renderButton(require('../../../res/images/ic_star.png'))
            getButton(onBack)
          } />
      )
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onBack: this.onBack
    });
  }
  onBack = () => {
    if (this.state.canGoBack) this.webView.goBack();
    else this.props.navigation.goBack();
  };
  onNavigationStateChange = e => {
    this.setState({
      canGoBack: e.canGoBack
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={webView=>this.webView=webView}
          onNavigationStateChange={e=>this.onNavigationStateChange(e)}
          startInLoadingState={true}
          source={{uri: this.state.url}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
