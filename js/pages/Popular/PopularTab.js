import React, { Component } from 'react';
import Toast from 'react-native-root-toast';
import DataRepository, {FLAG_STORAGE} from "../../expand/dao/DataRepository";
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import RepositoryCell from '../../common/RepositoryCell';

const URL = 'http://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=starts';

export default class PopularTab extends Component{
  constructor() {
    super();
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
    this.state = {
      dataSource: [],
      isLoading: false,
      toasting: false
    }
  }
  componentDidMount() {
    this.mounted = true;
    this.toastingConfig = {
      duration: 500,
      position: -80,
      shadow: true,
      animation: true,
      hideOnPress: true,
      onShow: () => {
        if (this.mounted) this.setState({toasting: true});
      },
      onHidden: () => {
        if (this.mounted) this.setState({toasting: false});
      },
    };
    this.loadData();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  loadData = () => {
    this.setState({isLoading: true});
    let url = URL + this.props.tabLabel.label + QUERY_STR;
    this.dataRepository.fetchRepository(url)
      .then(res=>{
        let items = res.items || [];
        items = items.map((d, i)=>{
          d.key = i+'';
          return d;
        });
        if (this.mounted) {
          this.setState({
            dataSource: items,
            isLoading: false
          });
        }
        if (res.updateAt && !this.dataRepository.isNew(res.updateAt)) {
          Toast.show('Expired!', {...this.toastingConfig, onShow: ()=>{}});
          this.setState({isLoading: true});
          return this.dataRepository.fetchNetRepository(url)
        } else if (res.updateAt) {
          Toast.show('Local data!', this.toastingConfig);
        } else {
          Toast.show('Network data!', this.toastingConfig);
        }
      })
      .then(res=>{
        if (!res || !res.items || !res.items.length) return;
        let items = res.items.map((d, i)=>{
          d.key = i+'';
          return d;
        });
        if (this.mounted) {
          this.setState({
            dataSource: items,
            isLoading: false
          });
        }
        Toast.show('Network data!', this.toastingConfig);
      })
      .catch(err=>{
        console.log(err);
        this.setState({isLoading: false})
      });
  };
  renderRow = data => {
    return <RepositoryCell onSelect={()=>this.onSelect(data)} data={data} />;
  };
  onSelect = item => {
    this.props.navigation.navigate("RepositoryDetail", {
      item: item,
      ...this.props
    })
  };
  render() {
    const {dataSource, isLoading} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={dataSource}
          renderItem={({item}) => this.renderRow(item)}
          onRefresh={this.loadData}
          refreshing={isLoading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    height: 80,
    margin: 10,
  },
  text: {
    fontSize: 20
  },
  line: {
    height: 1,
    backgroundColor: 'black'
  }
});
