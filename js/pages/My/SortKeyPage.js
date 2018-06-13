import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert
} from 'react-native';
import SortableListView from 'react-native-sortable-listview'
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import {getButton} from "../../util/ViewUtil";
import NavigationBar from '../../common/NavigationBar';
import {clone, isEqual} from '../../util/ArrayUtil';

let SortCell = ({data, sortHandlers}) => (
  <TouchableHighlight
    underlayColor={'#eee'}
    style={styles.item}
    {...sortHandlers} >
    <View style={styles.row}>
      <Image
        style={styles.image}
        source={require('./img/ic_sort.png')} />
      <Text>{data && data.name}</Text>
    </View>
  </TouchableHighlight>
);

export default class SortKeyPage extends Component {
  static navigationOptions = ({navigation}) => {
    let { params } = navigation.state;
    let onBack = params ? params.onBack : ()=>{};
    let onSave = params ? params.onSave : ()=>{};
    let flag = (params && params.flag) ? params.flag : FLAG_LANGUAGE.flag_key;
    let title = flag === FLAG_LANGUAGE.flag_language ? 'Language Sort' : 'Key Sort';
    let rightBtn = (
      <TouchableOpacity onPress={()=>onSave()}>
        <View style={{margin: 10}}>
          <Text style={styles.title}>Save</Text>
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
          rightButton={rightBtn}
        />
      ),
    };
  };
  constructor(props) {
    super(props);
    this.dataArrya = [];
    this.sortResultArray = [];
    this.originalCheckedArray = [];

    let { params } = this.props.navigation.state;
    this.flag = (params && params.flag) ? params.flag : FLAG_LANGUAGE.flag_key;
    this.languageDao = new LanguageDao(this.flag);

    this.state = {
      checkedArray: []
    };
  }
  componentDidMount() {
    this.props.navigation.setParams({
      onBack: this.onBack,
      onSave: this.onSave
    });
    this.loadData();
  }
  onBack = () => {
    if (!isEqual(this.originalCheckedArray, this.state.checkedArray)) {
      Alert.alert(
        'Tips',
        'Save changes？',
        [
          {text: "Don't save", onPress: () => {this.props.navigation.goBack()}, style: 'cancel'},
          {
            text: 'Save',
            onPress: () => {
              this.onSave(true);
            }
          },
        ],
        {cancelable: false}
      )
    } else {
      this.props.navigation.goBack();
    }
  };
  onSave = isChecked => {
    if (isChecked || !isEqual(this.originalCheckedArray, this.state.checkedArray)) {
      this.getSortResult();
      this.languageDao.save(this.sortResultArray);
    }
    this.props.navigation.goBack();
  };
  getSortResult = () => {
    this.sortResultArray = clone(this.dataArrya);
    for (let i = 0; i < this.originalCheckedArray.length; i++) {
      let item = this.originalCheckedArray[i];
      let index = this.dataArrya.indexOf(item);
      this.sortResultArray.splice(index, 1, this.state.checkedArray[i])
    }
  };
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
    return (
      <View style={styles.container}>
        <SortableListView
          style={{flex: 1}}
          data={this.state.checkedArray}
          order={Object.keys(this.state.checkedArray)}
          onRowMoved={e => {
            this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
          renderRow={row => <SortCell data={row} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    tintColor: '#2196f3',
    height: 16,
    width: 16,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
});