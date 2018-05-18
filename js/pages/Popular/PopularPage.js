import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../../common/NavigationBar';
import PopularTab from './PopularTab'
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.state = {
      languages: [{
        "path": "react",
        "name": "React",
        "checked": true
      }],
    };
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
          title="Popular"
          leftButton={
            renderButton(require('../../../res/images/ic_arrow_back_white_36pt.png'))
          }
          rightButton={
            renderButton(require('../../../res/images/ic_star.png'))
          } />
      ),
    };
  };
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    this.languageDao.fetch()
      .then(res=>{
        this.setState({
          languages: res
        });
      })
      .catch(e=>console.log(e))
  };
  render() {
    const {languages} = this.state;
    let content = languages.length ? (
      <ScrollableTabView
        tabBarBackgroundColor='#2196f3'
        tabBarActiveTextColor='#fff'
        tabBarInactiveTextColor='mintcream'
        tabBarUnderlineStyle={{
          backgroundColor: '#e7e7e7',
          height: 2,
        }}
        renderTabBar={()=><DefaultTabBar />}>
        {
          languages.map((item, i) => (
            item.checked && <PopularTab key={i} tabLabel={item.name} />
          ))
        }
      </ScrollableTabView>
    ) : null;
    return (
      <View style={styles.page}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'red'
  }
});