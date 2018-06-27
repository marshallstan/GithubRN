import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../../common/NavigationBar';
import FavoriteTab from './FavoriteTab'
import {FLAG_STORAGE} from "../../expand/dao/DataRepository";


export default class FavoritePage extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: (
        <NavigationBar title="Favorite" />
      ),
    };
  };
  render() {
    return (
      <View style={styles.page}>
        <ScrollableTabView
          tabBarBackgroundColor='#2196f3'
          tabBarActiveTextColor='#fff'
          tabBarInactiveTextColor='mintcream'
          tabBarUnderlineStyle={{
            backgroundColor: '#e7e7e7',
            height: 2,
          }}
          renderTabBar={()=>
            <DefaultTabBar
              tabBarStyle={{marginTop: 0, elevation: 2}}
              tabMargin={35}
              underlineColor='#e7e7e7'
              tabBarTextStyle={{color: "#eee"}}
              activeTabTextStyle={{color: "#fff"}} />}
        >
          <FavoriteTab
            tabLabel='Popular'
            flag={FLAG_STORAGE.flag_popular}
            navigation={this.props.navigation} />
          <FavoriteTab
            tabLabel='Trending'
            flag={FLAG_STORAGE.flag_trending}
            navigation={this.props.navigation} />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  }
});