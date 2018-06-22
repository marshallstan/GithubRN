import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import NavigationBar from '../../common/NavigationBar';
import TrendingTab from './TrendingTab'
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import TabBar from "react-native-underline-tabbar";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import TimeSpan from "../../model/TimeSpan";
import FavoriteDao from "../../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../../expand/dao/DataRepository";
import DataRepository from "../../expand/dao/DataRepository";

let favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
let dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
const {Popover} = renderers;

let timeSpanTextArray = [
  new TimeSpan('Today', '?since=daily'),
  new TimeSpan('This week', '?since=weekly'),
  new TimeSpan('This month', '?since=monthly')
];

export default class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
    this.state = {
      languages: [],
      timeSpan: timeSpanTextArray[0]
    };
  }
  static navigationOptions = ({navigation}) => {
    let { params } = navigation.state;
    let renderTitleView = params ? params.renderTitleView : ()=>{};
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
          titleView={renderTitleView()}
          // leftButton={
          //   renderButton(require('../../../res/images/ic_arrow_back_white_36pt.png'))
          // }
          // rightButton={
          //   renderButton(require('../../../res/images/ic_star.png'))
          // }
        />
      ),
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({
      renderTitleView: this.renderTitleView
    });
    this.loadData();
  }
  onSelectTimeSpan = value => {
    this.setState({
      timeSpan: value
    });
  };
  renderTitleView = () => {
    return (
        <Menu
          renderer={Popover}
          rendererProps={rendererStyles}
          onSelect={value => this.onSelectTimeSpan(value)}>
          <MenuTrigger>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: '#fff', fontWeight: '400'}}>
                Trending
              </Text>
              <Image
                style={{width: 12, height: 12, marginLeft: 5}}
                source={require('../../../res/images/ic_spinner_triangle.png')} />
            </View>
          </MenuTrigger>
          <MenuOptions customStyles={optionsStyles}>
            {
              timeSpanTextArray.map((item, i) => (
                <MenuOption
                  key={i}
                  value={item}
                  text={item.showText} />
              ))
            }
          </MenuOptions>
        </Menu>
    );
  };
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
    const {languages, timeSpan} = this.state;
    let content = (languages && languages.length) ? (
      <ScrollableTabView
        tabBarBackgroundColor='#2196f3'
        tabBarActiveTextColor='#fff'
        tabBarInactiveTextColor='mintcream'
        tabBarUnderlineStyle={{
          backgroundColor: '#e7e7e7',
          height: 2,
        }}
        renderTabBar={()=><TabBar
          tabBarStyle={{marginTop: 0, elevation: 2}}
          tabMargin={35}
          underlineColor='#e7e7e7'
          tabBarTextStyle={{color: "#eee"}}
          activeTabTextStyle={{color: "#fff"}} />}>
        {
          languages.map((item, i) => (
            item.checked && (
              <TrendingTab
                dataRepository={dataRepository}
                favoriteDao={favoriteDao}
                key={i}
                timeSpan={timeSpan}
                tabLabel={{label: item.name}}
                {...this.props} />
            )
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
});

const rendererStyles = {
  anchorStyle: {
    backgroundColor: '#343434',
  }
};

const optionsStyles = {
  optionsContainer: {
    padding: 5,
    backgroundColor: '#343434',
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400'
  },
};