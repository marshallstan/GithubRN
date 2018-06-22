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
    let projectModel = params ? params.projectModel : {};
    let url = item.html_url || PRE_URL + item.fullName;
    this.state = {
      url: url,
      canGoBack: false,
      projectModel: projectModel
    };
  }
  static navigationOptions = ({navigation}) => {
    let { params } = navigation.state;
    let onBack = params ? params.onBack : ()=>{};
    let onRightClick = params ? params.onRightClick : ()=>{};
    let item = params && params.projectModel ? params.projectModel.item : {};
    let isFavorite = params && params.projectModel ? params.projectModel.isFavorite : false;
    let title = item.full_name || item.fullName;
    let favoriteIcon = isFavorite
      ? require('../../../res/images/ic_star.png')
      : require('../../../res/images/ic_star_navbar.png');
    let renderButton = () => (
      <TouchableOpacity onPress={onRightClick}>
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
      onBack: this.onBack,
      onRightClick: this.onRightClick
    });
  }
  onRightClick = () => {
    let {projectModel} = this.state;
    let item = projectModel.item || {};
    let id = item.id ? item.id.toString() : item.fullName;

    projectModel.isFavorite = !projectModel.isFavorite;
    this.setFavoriteState(projectModel);

    if (projectModel.isFavorite) {
      this.favoriteDao.saveFavoriteItem(id, JSON.stringify(item))
    } else {
      this.favoriteDao.removeFavoriteItem(id);
    }
  };
  setFavoriteState = projectModel => {
    this.props.navigation.setParams({
      projectModel: projectModel
    });
  };
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
