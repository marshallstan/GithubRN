import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {FLAG_LANGUAGE} from "./LanguageDao";

export default class DataRepository {
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
    return (
      axios.get(url)
        .then(res=>{
          if (!res) return new Error('responseData is null.');
          else {
            res.data && this.saveRepository(url, res.data.items);
            return res.data;
          }
        })
    );
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
    if (cDate.getHours() - tDate.getHours() > 4) return false;
    return true;
  };
}