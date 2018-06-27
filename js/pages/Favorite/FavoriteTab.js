import React, { Component } from 'react'
import {View, FlatList, StyleSheet, Text} from 'react-native'
import RepositoryCell from '../../common/RepositoryCell'
import ProjectModel from '../../model/ProjectModel'
import FavoriteDao from '../../expand/dao/FavoriteDao'
import {FLAG_STORAGE} from '../../expand/dao/DataRepository'
import TrendingCell from '../../common/TrendingCell'
import {updateArray} from '../../util/ArrayUtil'

export default class FavoriteTab extends Component{
  constructor(props) {
    super(props);
    this.favoriteDao = new FavoriteDao(props.flag);
    this.unFavoriteItems = [];
    this.state = {
      dataSource: [],
      isLoading: false
    }
  }
  componentDidMount() {
    this.loadData();
  }
  updateState = (obj, callback) => {
    if (!this) return;
    this.setState(obj, callback);
  };
  loadData = () => {
    this.updateState({isLoading: true});
    this.favoriteDao.getAllItems()
      .then(items=>{
        let resultArray = [];
        items.map((item, i)=>{
          resultArray.push(new ProjectModel(item, true, i + ''))
        });
        this.updateState({
          isLoading: false,
          dataSource: resultArray
        });
      })
      .catch(e=>{
        console.log(e);
        this.updateState({isLoading: false});
      })
  };
  onFavorite = (projectModel, isFavorite) => {
    let [...dataArray] = this.state.dataSource;
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].key === projectModel.key) {
        dataArray.splice(i, 1);
      }
    }
    this.updateState({dataSource: dataArray});

    let key = projectModel.item.fullName || projectModel.item.id.toString();
    if (isFavorite) {
      this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item))
    } else {
      this.favoriteDao.removeFavoriteItem(key);
    }

    updateArray(this.unFavoriteItems, projectModel.item)
  };
  renderRow = projectModel => {
    let CellComponent = this.props.flag === FLAG_STORAGE.flag_popular
      ? RepositoryCell
      : TrendingCell;
    return (
      <CellComponent
        onFavorite={isFavorite => this.onFavorite(projectModel, isFavorite)}
        onSelect={()=>this.onSelect(projectModel)}
        projectModel={projectModel} />
    );
  };
  onSelect = projectModel => {
    this.props.navigation.navigate("RepositoryDetail", {
      projectModel: projectModel,
      onFavorite: isFavorite => this.onFavorite(projectModel, isFavorite),
      favoriteDao: this.favoriteDao
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
          ListEmptyComponent={<Text style={styles.text}>No data...</Text>}
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
  text: {
    marginTop: 30,
    fontSize: 20,
    color: '#2196f3',
    textAlign: 'center'
  }
});
