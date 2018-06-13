import React, { Component } from 'react'
import Toast from 'react-native-root-toast'
import DataRepository, {FLAG_STORAGE} from "../../expand/dao/DataRepository"
import {View, FlatList, StyleSheet} from 'react-native'
import TrendingCell from '../../common/TrendingCell'

const API_URL = 'https://github.com/trending/';

export default class TrendingTab extends Component{
  constructor() {
    super();
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
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
    this.loadData(this.props.timeSpan, true);
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.timeSpan !== this.props.timeSpan) {
      this.loadData(nextProps.timeSpan);
    }
  }
  getFetchUrl = (category, timeSpan) => {
    return API_URL + category + timeSpan.searchText;
  };
  loadData = (timeSpan, isRefresh) => {
    this.setState({isLoading: true});
    let url = this.getFetchUrl(this.props.tabLabel.label, timeSpan);
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
    return <TrendingCell onSelect={()=>this.onSelect(data)} data={data} />;
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
          onRefresh={()=>{this.loadData(this.props.timeSpan)}}
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
