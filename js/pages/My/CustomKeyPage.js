import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert, AsyncStorage
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import {getButton} from '../../util/ViewUtil';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box'
import {updateArray, remove} from '../../util/ArrayUtil';

export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
    this.changeValues = [];
    let { params } = this.props.navigation.state;
    this.isRemoveKey = params ? params.isRemoveKey : false;
    this.flag = (params && params.flag) ? params.flag : FLAG_LANGUAGE.flag_key;
    this.languageDao = new LanguageDao(this.flag);
    this.state = {
      dataArray: [],
    };
  }
  static navigationOptions = ({navigation}) => {
    let { params } = navigation.state;
    let onSave = params ? params.onSave : ()=>{};
    let onBack = params ? params.onBack : ()=>{};
    let isRemoveKey = params ? params.isRemoveKey : false;
    let flag = (params && params.flag) ? params.flag : FLAG_LANGUAGE.flag_key;
    let title = isRemoveKey ? 'Delete Key' : 'Custom Key';
    title = flag === FLAG_LANGUAGE.flag_language ? 'Custom Language' : title;
    let rightBtn = (
      <TouchableOpacity onPress={()=>{onSave()}}>
        <View style={{margin: 10}}>
          <Text style={styles.title}>{isRemoveKey?'Delete':'Save'}</Text>
        </View>
      </TouchableOpacity>
    );
    return {
      header: (
        <NavigationBar
          title={title}
          leftButton={
            getButton(onBack)
          }
          rightButton={rightBtn} />
      ),
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onSave: this.onSave,
      onBack: this.onBack
    });
    this.loadData();
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
        'Tips',
        'Save changes？',
        [
          {text: "Don't save", onPress: () => {this.props.navigation.goBack()}, style: 'cancel'},
          {
            text: 'Save',
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
    if (!dataArray || !dataArray.length) return;
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