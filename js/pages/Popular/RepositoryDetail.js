import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getButton} from '../../util/ViewUtil';
import NavigationBar from '../../common/NavigationBar';

const PRE_URL = 'https://github.com/';

export default class RepositoryDetail extends Component {
  constructor(props) {
    super(props);
    let { params } = props.navigation.state;
    this.favoriteDao = params.favoriteDao;
    let item = params && params.projectModel ? params.projectModel.item : {};
    let url = item.html_url || PRE_URL + item.fullName;
    this.state = {
      url: url,
      canGoBack: false
    };
  }
  static navigationOptions = ({navigation}) => {
    let { params } = navigation.state;
    let onBack = params ? params.onBack : ()=>{};
    let onFavorite = params ? params.onFavorite : ()=>{};
    let projectModel = params ? params.projectModel : {};
    let item = projectModel ? projectModel.item : {};
    let isFavorite = projectModel ? projectModel.isFavorite : false;
    let title = item.full_name || item.fullName;
    let favoriteIcon = isFavorite
      ? require('../../../res/images/ic_star.png')
      : require('../../../res/images/ic_star_navbar.png');
    let onRightPress = () => {
      onFavorite(!isFavorite);
      projectModel.isFavorite = !isFavorite;
      navigation.setParams({
        projectModel: projectModel
      });
    };
    let renderButton = () => (
      <TouchableOpacity onPress={onRightPress}>
        <Image
          style={{width: 23, height: 23, margin: 5}}
          source={favoriteIcon} />
      </TouchableOpacity>
    );
    return {
      header: (
        <NavigationBar
          title={title}
          leftButton={getButton(onBack)}
          rightButton={renderButton()} />
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
