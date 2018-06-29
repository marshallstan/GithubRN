import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
// import TestContainer from './TestContainer'
import {MORE_MENU} from '../../common/MoreMenu'
import GlobalStyles from '../../../res/styles/GlobalStyles'
import {getSettingItem} from '../../util/ViewUtil'

export default class MyPage extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: (
        <NavigationBar
          title="My"
        />
      ),
    };
  };
  onClick = tab => {
    let TargetComponent, params = {menuType: tab};
    switch (tab) {
      case MORE_MENU.Custom_Language:
        TargetComponent = 'CustomKeyPage';
        params.flag = FLAG_LANGUAGE.flag_language;
        break;
      case MORE_MENU.Custom_Key:
        TargetComponent = 'CustomKeyPage';
        params.flag = FLAG_LANGUAGE.flag_key;
        break;
      case MORE_MENU.Remove_Key:
        TargetComponent = 'CustomKeyPage';
        params.flag = FLAG_LANGUAGE.flag_key;
        params.isRemoveKey = true;
        break;
      case MORE_MENU.Sort_Language:
        TargetComponent = 'SortKeyPage';
        params.flag = FLAG_LANGUAGE.flag_language;
        break;
      case MORE_MENU.Sort_Key:
        TargetComponent = 'SortKeyPage';
        params.flag = FLAG_LANGUAGE.flag_key;
        break;
      // case MORE_MENU.Custom_Theme:
      //   this.setState({customThemeViewVisible:true});
      //   break;
      // case MORE_MENU.About_Author:
      //   TargetComponent = AboutMePage;
      //   break;
      // case MORE_MENU.About:
      //   TargetComponent = AboutPage;
      //   break;
      // case 'Update':
      //   this.update();
      //   break;
    }
    if (TargetComponent) {
      this.props.navigation.navigate(TargetComponent, params);
    }
  };
  getItem = (tag, icon, text) => {
    return getSettingItem(()=>this.onClick(tag), icon, text, {tintColor: '#2196f3'}, null);
  };
  render() {
    return (
      <View style={GlobalStyles.root_container}>
        <ScrollView>
          <TouchableHighlight onPress={()=>{this.onClick(MORE_MENU.About)}}>
            <View style={styles.item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={[{width: 40, height: 40, marginRight: 10}, {tintColor: '#2196f3'}]}
                  source={require('../../../res/images/ic_trending.png')} />
                <Text>GitHub Repositories</Text>
              </View>
              <Image
                style={[styles.tiaozhuanIcon, {tintColor: '#2196f3'}]}
                source={require('../../../res/images/ic_tiaozhuan.png')} />
            </View>
          </TouchableHighlight>
          <View style={GlobalStyles.line} />

          <Text style={styles.groupTitle}>Custom trending language</Text>

          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.Custom_Language,
            require('./img/ic_custom_language.png'),
            'Custom Language'
          )}

          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.Sort_Language,
            require('./img/ic_swap_vert.png'),
            'Sort Language'
          )}

          <Text style={styles.groupTitle}>Custom popular key</Text>

          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.Custom_Key,
            require('./img/ic_custom_language.png'),
            'Custom Key'
          )}

          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.Sort_Key,
            require('./img/ic_swap_vert.png'),
            'Sort Key'
          )}

          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.Remove_Key,
            require('./img/ic_remove.png'),
            'Remove Key'
          )}

          <Text style={styles.groupTitle}>Setting</Text>

          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.Custom_Theme,
            require('./img/ic_view_quilt.png'),
            'Custom Theme'
          )}

          <View style={GlobalStyles.line} />
          {this.getItem(
            MORE_MENU.About_Author,
            require('./img/ic_insert_emoticon.png'),
            'About Author'
          )}

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 80,
    backgroundColor: '#fff'
  },
  tiaozhuanIcon: {
    marginRight: 10,
    height: 22,
    width: 22,
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray'
  }
});
