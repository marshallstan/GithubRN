import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import {getSettingItem, getButton} from '../../util/ViewUtil'
import {MORE_MENU} from '../../common/MoreMenu'
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import GlobalStyles from "../../../res/styles/GlobalStyles";

export default class AboutPage extends Component {
  constructor(props) {
    super(props);
  }

  getParallaxRenderConfig = params => {
    let config = {};
    config.renderBackground = () => (
      <View key="background">
        <Image source={{uri: params.backgroundImg,
          width: window.width,
          height: PARALLAX_HEADER_HEIGHT}} />
        <View style={{position: 'absolute',
          top: 0,
          width: window.width,
          backgroundColor: 'rgba(0,0,0,.4)',
          height: PARALLAX_HEADER_HEIGHT}} />
      </View>
    );
    config.renderForeground = () => (
      <View key="parallax-header" style={ styles.parallaxHeader }>
        <Image style={ styles.avatar }
               source={{
                 uri: params.avatar,
                 width: AVATAR_SIZE,
                 height: AVATAR_SIZE
               }}/>
        <Text style={ styles.sectionSpeakerText }>
          {params.name}
        </Text>
        <Text style={ styles.sectionTitleText }>
          {params.description}
        </Text>
      </View>
    );
    config.renderStickyHeader = () => (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{params.name}</Text>
      </View>
    );
    config.renderFixedHeader = () => (
      <View key="fixed-header" style={styles.fixedSection}>
        {getButton(()=>{this.props.navigation.goBack()})}
      </View>
    );
    return config;
  };
  onClick = tab => {
    let TargetComponent, params = {menuType: tab};
    switch (tab) {
      case MORE_MENU.Website:
        TargetComponent = 'CustomKeyPage';
        break;
      case MORE_MENU.About_Author:
        TargetComponent = 'CustomKeyPage';
        break;
      case MORE_MENU.Feedback:
        TargetComponent = 'CustomKeyPage';
        break;
    }
    if (TargetComponent) {
      this.props.navigation.navigate(TargetComponent, params);
    }
  };
  renderView = (contentView, params) => {
    let renderConfig = this.getParallaxRenderConfig(params);
    return (
      <ParallaxScrollView
        headerBackgroundColor="#333"
        backgroundColor="#2196f3"
        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
        backgroundSpeed={10}
        {...renderConfig} >
        {contentView}
      </ParallaxScrollView>
    );
  };
  render() {
    let content = (
      <View>
        {getSettingItem(
          ()=>this.onClick(MORE_MENU.Website),
          require('../../../res/images/ic_computer.png'),
          MORE_MENU.Website,
          {tintColor: '#2196f3'},
          null
        )}
        <View style={GlobalStyles.line} />

        {getSettingItem(
          ()=>this.onClick(MORE_MENU.About_Author),
          require('../My/img/ic_insert_emoticon.png'),
          MORE_MENU.About_Author,
          {tintColor: '#2196f3'},
          null
        )}
        <View style={GlobalStyles.line} />

        {getSettingItem(
          ()=>this.onClick(MORE_MENU.Feedback),
          require('../../../res/images/ic_feedback.png'),
          MORE_MENU.Feedback,
          {tintColor: '#2196f3'},
          null
        )}
        <View style={GlobalStyles.line} />
      </View>
    );
    return this.renderView(content, {
      name: 'Github Repository',
      description: 'An app',
      avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531127900&di=1924c3b10b4bb587d5833cb3eddd5564&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.overdope.com%2Fwp-content%2Fuploads%2F2016%2F08%2F2016-08-22_153005.png',
      backgroundImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530533170817&di=8e06182a5413df196472d1ae7d41c62e&imgtype=0&src=http%3A%2F%2Fp4.music.126.net%2FmUR_b6ywsfZfqpOL-0UZzQ%3D%3D%2F1364493957556191.jpg',
    });
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 270;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + 20 : GlobalStyles.nav_bar_height_android;

const styles = StyleSheet.create({
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    justifyContent: 'space-between'
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 60
  },
  avatar: {
    marginBottom: 5,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  }
});
