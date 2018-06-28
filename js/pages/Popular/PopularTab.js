import React, { Component } from 'react'
import Toast from 'react-native-root-toast'
import {View, FlatList, StyleSheet, DeviceEventEmitter} from 'react-native'
import RepositoryCell from '../../common/RepositoryCell'
import ProjectModel from "../../model/ProjectModel"
import Utils from '../../util/Utils'

const URL = 'http://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=starts';

export default class PopularTab extends Component{
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
    this.loadData();
    this.listener = DeviceEventEmitter.addListener('favoriteChanged_popular', projectModel => {
      this.onFavorite(projectModel, false);
    });
  }
  componentWillUnmount() {
    if (this.listener) {
      this.listener.remove();
    }
  }
  updateState = (obj, callback) => {
    if (!this) return;
    this.setState(obj, callback);
  };
  getFavoriteKeys = () => {
    return new Promise(res=>{
      this.favoriteDao.getFavoriteKeys()
        .then(keys => {
          if (keys) {
            this.updateState({favoriteKeys: keys}, this.flushFavoriteState)
          } else {
            this.flushFavoriteState();
          }
          res();
        })
        .catch(e=>{
          console.log(e);
          this.flushFavoriteState();
          res();
        });
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
  loadData = () => {
    this.updateState({isLoading: true});
    let url = URL + this.props.tabLabel.label + QUERY_STR;
    let result = {};
    this.dataRepository.fetchRepository(url)
      .then(res=>{
        result = res;
        this.items = res.items || [];
        return this.getFavoriteKeys();
      })
      .then(()=>{
        if (result.updateAt && !this.dataRepository.isNew(result.updateAt)) {
          Toast.show('Expired!', {...this.toastingConfig, onShow: ()=>{}});
          this.updateState({isLoading: true});
          return this.dataRepository.fetchNetRepository(url)
        } else if (result.updateAt) {
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
  onFavorite = (projectModel, isFavorite) => {
    let [...dataArray] = this.state.dataSource;
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].key === projectModel.key) {
        dataArray[i].isFavorite = isFavorite;
      }
    }
    this.updateState({dataSource: dataArray});

    if (isFavorite) {
      this.favoriteDao.saveFavoriteItem(projectModel.item.id.toString(), JSON.stringify(projectModel.item))
    } else {
      this.favoriteDao.removeFavoriteItem(projectModel.item.id.toString());
    }
  };
  renderRow = projectModel => {
    return (
      <RepositoryCell
        onFavorite={isFavorite => this.onFavorite(projectModel, isFavorite)}
        onSelect={()=>this.onSelect(projectModel)}
        projectModel={projectModel} />
    );
  };
  onSelect = projectModel => {
    this.props.navigation.navigate("RepositoryDetail", {
      projectModel: projectModel,
      onFavorite: isFavorite => this.onFavorite(projectModel, isFavorite),
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
