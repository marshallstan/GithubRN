import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import {getButton} from '../../util/ViewUtil';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box'

export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.state = {
      dataArray: [],
      changeValues: []
    };
  }
  static navigationOptions = ({navigation}) => {
    let goBack = navigation.goBack;
    let rightBtn = (
      <TouchableOpacity onPress={()=>{}}>
        <View style={{margin: 10}}>
          <Text style={styles.title}>保存</Text>
        </View>
      </TouchableOpacity>
    );
    return {
      header: (
        <NavigationBar
          title="自定义标签"
          leftButton={
            getButton(goBack)
          }
          rightButton={rightBtn} />
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
          dataArray: res
        });
      })
      .catch(e=>console.log(e))
  };
  renderView = () => {
    let {dataArray} = this.state;
    if (!dataArray || !dataArray.length) return null;
    let len = dataArray.length;
    let views = [];
    for (let i = 0; i < len; i += 2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this.renderCheckBox(dataArray[i])}
            {
              dataArray[i+1]
              ? this.renderCheckBox(dataArray[i+1])
              : null
            }
          </View>
          <View style={styles.line} />
        </View>
      )
    }
    return views;
  };
  renderCheckBox = data => {
    let leftText = data.name;
    return (
      <CheckBox
        style={{
          flex: 1,
          padding: 10
        }}
        leftText={leftText}
        checkedImage={
          <Image
            style={{tintColor: '#6495ed'}}
            source={require('./img/ic_check_box.png')} />
        }
        unCheckedImage={
          <Image
            style={{tintColor: '#6495ed'}}
            source={require('./img/ic_check_box_outline_blank.png')} />
        }
        onClick={()=>{this.onClick(data)}} />
    );
  };
  onClick = data => {

  };
  render() {
    return (
      <View style={styles.page}>
        <ScrollView>
          {this.renderView()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  line: {
    height: .5,
    backgroundColor: 'darkgray',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});