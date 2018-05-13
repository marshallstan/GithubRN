import React, { Component } from 'react';
import DataRepository from "../expand/dao/DataRepository";
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import RepositoryCell from './RepositoryCell';

const URL = 'http://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=starts';

export default class PopularTab extends Component{
  constructor() {
    super();
    this.dataRepository = new DataRepository();
    this.state = {
      result: '',
      dataSource: [],
      isLoading: true
    }
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    let url = URL + this.props.tabLabel + QUERY_STR;
    this.dataRepository.fetchNetRepository(url)
      .then(res=>{
        let items = res.data.items || [];
        items = items.map((d, i)=>{
          d.key = i+'';
          return d;
        });
        this.setState({
          dataSource: this.state.dataSource.concat(items)
        });
      })
      .catch(err=>{
        this.setState({
          result: JSON.stringify(err)
        });
      });
  };
  renderSeparator = () => <View style={styles.line} />;
  renderFooter = () => <Image style={{width: '100%', height: 100}} source={{uri: 'https://images.gr-assets.com/hostedimages/1406479536ra/10555627.gif'}} />;
  renderRow = data => {
    return <RepositoryCell data={data} />;
  };
  render() {
    const {dataSource, isLoading} = this.state;
    return (
      <View style={styles.container}>
        <Text>{dataSource.length}</Text>
        <FlatList
          data={dataSource}
          // ItemSeparatorComponent={this.renderSeparator}
          // ListFooterComponent={this.renderFooter}
          renderItem={({item}) => this.renderRow(item)}
          onRefresh={this.onLoad}
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
