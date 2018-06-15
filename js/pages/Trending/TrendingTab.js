import React, { Component } from 'react'
import Toast from 'react-native-root-toast'
import {View, FlatList, StyleSheet} from 'react-native'
import TrendingCell from '../../common/TrendingCell'
import ProjectModel from "../../model/ProjectModel"
import Utils from "../../util/Utils";

const API_URL = 'https://github.com/trending/';

export default class TrendingTab extends Component{
  constructor(props) {
    super(props);
    this.dataRepository = props.dataRepository;
    this.favoriteDao = props.favoriteDao;
    this.state = {
      dataSource: [],
      isLoading: false,
      toasting: false,
      favoriteKeys: []
    }
  }
  componentDidMount() {
    this.toastingConfig = {
      duration: 500,
      position: -80,
      shadow: true,
      animation: true,
      hideOnPress: true,
      onShow: () => {
        this.updateState({toasting: true});
      },
      onHidden: () => {
        this.updateState({toasting: false});
      },
    };
    this.loadData(this.props.timeSpan, true);
  }
  updateState = (obj, callback) => {
    if (!this) return;
    this.setState(obj, callback);
  };
  getFavoriteKeys = () => {
    this.favoriteDao.getFavoriteKeys()
      .then(keys => {
        if (keys) {
          this.updateState({favoriteKeys: keys}, this.flushFavoriteState)
        } else {
          this.flushFavoriteState();
        }
      })
      .catch(e=>{
        console.log(e);
        this.flushFavoriteState();
      });
  };
  flushFavoriteState = () => {
    let projectModels = [];
    let items = this.items;
    items && items.map((item, i) => {
      projectModels.push(new ProjectModel(item, Utils.checkFavorite(item, this.state.favoriteKeys), i+''))
    });
    this.updateState({
      isLoading: false,
      dataSource: projectModels
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.timeSpan !== this.props.timeSpan) {
      this.loadData(nextProps.timeSpan);
    }
  }
  getFetchUrl = (category, timeSpan) => {
    return API_URL + category + timeSpan.searchText;
  };
  loadData = (timeSpan, isRefresh) => {
    this.updateState({isLoading: true});
    let url = this.getFetchUrl(this.props.tabLabel.label, timeSpan);
    this.dataRepository.fetchRepository(url)
      .then(res=>{
        this.items = res.items || [];
        this.getFavoriteKeys();
        if (res.updateAt && !this.dataRepository.isNew(res.updateAt)) {
          Toast.show('Expired!', {...this.toastingConfig, onShow: ()=>{}});
          this.updateState({isLoading: true});
          return this.dataRepository.fetchNetRepository(url)
        } else if (res.updateAt) {
          Toast.show('Local data!', this.toastingConfig);
        } else {
          Toast.show('Network data!', this.toastingConfig);
        }
      })
      .then(res=>{
        if (!res || !res.items || !res.items.length) return;
        this.items = res.items;
        this.getFavoriteKeys();
        Toast.show('Network data!', this.toastingConfig);
      })
      .catch(err=>{
        console.log(err);
        this.updateState({isLoading: false})
      });
  };
  onFavorite = (item, isFavorite) => {
    if (isFavorite) {
      this.favoriteDao.saveFavoriteItem(item.fullName, JSON.stringify(item))
    } else {
      this.favoriteDao.removeFavoriteItem(item.fullName);
    }
  };
  renderRow = projectModel => {
    return (
      <TrendingCell
        onFavorite={isFavorite => this.onFavorite(projectModel.item, isFavorite)}
        onSelect={()=>this.onSelect(projectModel)}
        projectModel={projectModel} />
    );
  };
  onSelect = projectModel => {
    this.props.navigation.navigate("RepositoryDetail", {
      item: projectModel.item,
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
