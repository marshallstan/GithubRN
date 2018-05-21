import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import {getButton} from "../../util/ViewUtil";
import NavigationBar from '../../common/NavigationBar';
import {clone} from '../../util/ArrayUtil';

export default class SortKeyPage extends Component {
  static navigationOptions = ({navigation}) => {
    let { params } = navigation.state;
    let onSave = params ? params.onSave : ()=>{};
    let onBack = params ? params.onBack : ()=>{};
    let rightBtn = (
      <TouchableOpacity onPress={()=>{onSave()}}>
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
            getButton(onBack)
          }
          rightButton={rightBtn} />
      ),
    };
  };
  constructor() {
    super();
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.dataArrya = [];
    this.sortResultArray = [];
    this.originalCheckedArray = [];
    this.state = {
      checkedArray: []
    };
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    this.languageDao.fetch()
      .then(res=>{
        this.getCheckedItems(res);
      })
      .catch(e=>console.log(e))
  };
  getCheckedItems = data => {
    this.dataArrya = data;
    let checkedArray = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item.checked) checkedArray.push(item);
    }
    this.setState({checkedArray});
    this.originalCheckedArray = clone(checkedArray);
  };
  render() {

  }
}