/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import codePush from 'react-native-code-push';
import TabNavigator from 'react-native-tab-navigator';
import NavigationBar from './js/NavigationBar';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'tab_popular'
    };
  }
  update = () => {
    codePush.sync({
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: '更新内容',
        title: '更新',
        mandatoryUpdateMessage: '',
        mandatoryContinueButtonLabel: '更新'
      },
      mandatoryInstallMode:codePush.InstallMode.IMMEDIATE
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          statusBar={{
            backgroundColor: 'red'
          }}
          title='Boy' />
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tab_popular'}
            selectedTitleStyle={{color: 'red'}}
            title="热门"
            renderIcon={() => (
              <Image
                style={styles.image}
                source={require('./res/images/ic_polular.png')} />
            )}
            renderSelectedIcon={() => (
              <Image
                style={[styles.image, {tintColor: 'red'}]}
                source={require('./res/images/ic_polular.png')} />
            )}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'tab_popular' })}>
            <View style={styles.page1} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tab_trending'}
            selectedTitleStyle={{color: 'red'}}
            title="趋势"
            renderIcon={() => (
              <Image
                style={styles.image}
                source={require('./res/images/ic_trending.png')} />
            )}
            renderSelectedIcon={() => (
              <Image
                style={[styles.image, {tintColor: 'red'}]}
                source={require('./res/images/ic_trending.png')} />
            )}
            onPress={() => this.setState({ selectedTab: 'tab_trending' })}>
            <View style={styles.page2} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tab_favorite'}
            selectedTitleStyle={{color: 'red'}}
            title="收藏"
            renderIcon={() => (
              <Image
                style={styles.image}
                source={require('./res/images/ic_polular.png')} />
            )}
            renderSelectedIcon={() => (
              <Image
                style={[styles.image, {tintColor: 'red'}]}
                source={require('./res/images/ic_polular.png')} />
            )}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'tab_favorite' })}>
            <View style={styles.page1} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tab_my'}
            selectedTitleStyle={{color: 'red'}}
            title="我的"
            renderIcon={() => (
              <Image
                style={styles.image}
                source={require('./res/images/ic_trending.png')} />
            )}
            renderSelectedIcon={() => (
              <Image
                style={[styles.image, {tintColor: 'red'}]}
                source={require('./res/images/ic_trending.png')} />
            )}
            onPress={() => this.setState({ selectedTab: 'tab_my' })}>
            <View style={styles.page2} />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  page1: {
    flex: 1,
    backgroundColor: 'red'
  },
  page2: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  image: {
    height: 22,
    width: 22
  }
});
