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
import NavigationBar from '../../common/NavigationBar';
import {getButton} from '../../util/ViewUtil';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box'
import {updateArray, remove} from '../../util/ArrayUtil';

export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.changeValues = [];
    let { params } = this.props.navigation.state;
    this.isRemoveKey = params ? params.isRemoveKey : false;
    this.state = {
      dataArray: [],
    };
  }
  static navigationOptions = ({navigation}) => {
    let { params } = navigation.state;
    let onSave = params ? params.onSave : ()=>{};
    let onBack = params ? params.onBack : ()=>{};
    let isRemoveKey = params ? params.isRemoveKey : false;
    let rightBtn = (
      <TouchableOpacity onPress={()=>{onSave()}}>
        <View style={{margin: 10}}>
          <Text style={styles.title}>{isRemoveKey?'移除':'保存'}</Text>
        </View>
      </TouchableOpacity>
    );
    return {
      header: (
        <NavigationBar
          title={isRemoveKey?'标签移除':'自定义标签'}
          leftButton={
            getButton(onBack)
          }
          rightButton={rightBtn} />
      ),
    };
  };
  componentDidMount() {
    this.loadData();
    this.props.navigation.setParams({
      onSave: this.onSave,
      onBack: this.onBack
    })
  }
  onSave = () => {
    if (this.changeValues.length) {
      if (this.isRemoveKey) {
        for (let i = 0; i < this.changeValues.length; i++) {
          remove(this.state.dataArray, this.changeValues[i])
        }
      }
      this.languageDao.save(this.state.dataArray);
    }
    this.props.navigation.goBack();
  };
  onBack = () => {
    if (this.changeValues.length) {
      Alert.alert(
        '提示',
        '保存修改？',
        [
          {text: '不保存', onPress: () => {this.props.navigation.goBack()}, style: 'cancel'},
          {
            text: '保存',
            onPress: () => {
              this.onSave();
            }
          },
        ],
        {cancelable: false}
      )
    } else {
      this.props.navigation.goBack();
    }
  };
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
              : <View style={{flex: 1, padding: 10}} />
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
    let isChecked = this.isRemoveKey ? false : data.checked;
    return (
      <CheckBox
        style={{
          flex: 1,
          padding: 10
        }}
        leftText={leftText}
        isChecked={isChecked}
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
    if (!this.isRemoveKey) data.checked = !data.checked;
    updateArray(this.changeValues, data);
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