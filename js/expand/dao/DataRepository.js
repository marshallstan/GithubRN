import axios from 'axios';
import {AsyncStorage} from 'react-native';
import GitHubTrending from 'GitHubTrending/trending/GitHubTrending';

export let FLAG_STORAGE = {
  flag_popular: 'popular',
  flag_trending: 'trending'
};
export default class DataRepository {
  constructor(flag) {
    this.flag = flag;
    if (flag === FLAG_STORAGE.flag_trending)
      this.trending = new GitHubTrending();
  }
  fetchRepository = url => {
    return new Promise(resolve => {
      this.fetchLocalRepository(url)
        .then(res=>{
          if (res) {
            resolve(res);
          } else {
            this.fetchNetRepository(url)
              .then(res=>resolve(res))
          }
        })
        .catch(()=>{
          this.fetchNetRepository(url)
            .then(res=>resolve(res))
        })
    });
  };
  fetchLocalRepository = url => {
    return (
      AsyncStorage.getItem(url)
        .then(res=>{
          if (res) return JSON.parse(res);
        })
    )
  };
  fetchNetRepository = url => {
    if (this.flag === FLAG_STORAGE.flag_trending) {
      return (
        this.trending.fetchTrending(url)
          .then(res=>{
            if (!res) return new Error('trendingData is null.');
            else {
              res && this.saveRepository(url, res);
              return {items: res};
            }
          })
      )
    } else {
      return (
        axios.get(url)
          .then(res=>{
            if (!res) return new Error('popularData is null.');
            else {
              res.data && this.saveRepository(url, res.data.items);
              return res.data;
            }
          })
      );
    }
  };
  saveRepository = (url, items, callback) => {
    if (!url || !items) return;
    let wrapData = {items: items, updateAt: new Date().getTime()};
    AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
  };
  isNew = longTime => {
    let cDate = new Date();
    let tDate = new Date(longTime);
    if (cDate.getMonth() !== tDate.getMonth()) return false;
    if (cDate.getDay() !== tDate.getDay()) return false;
    if (cDate.getHours() - tDate.getHours() > 1) return false;
    return true;
  };
}