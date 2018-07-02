import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ParallaxScrollView from 'react-native-parallax-scroll-view'

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
        <Text style={styles.fixedSectionText}
              onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
          Scroll to top
        </Text>
      </View>
    );
    return config;
  };
  renderView = params => {
    let renderConfig = this.getParallaxRenderConfig(params);
    return (
      <ParallaxScrollView
        headerBackgroundColor="#333"
        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
        backgroundSpeed={10}
        {...renderConfig} />
    );
  };
  render() {
    return this.renderView({
      name: 'Github Repository',
      description: 'An app',
      avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531127900&di=1924c3b10b4bb587d5833cb3eddd5564&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.overdope.com%2Fwp-content%2Fuploads%2F2016%2F08%2F2016-08-22_153005.png',
      backgroundImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530533170817&di=8e06182a5413df196472d1ae7d41c62e&imgtype=0&src=http%3A%2F%2Fp4.music.126.net%2FmUR_b6ywsfZfqpOL-0UZzQ%3D%3D%2F1364493957556191.jpg',
    });
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});
