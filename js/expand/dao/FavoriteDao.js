import {AsyncStorage} from 'react-native'

const FAVORITE_KEY_PREFIX = 'favorite_';

export default class FavoriteDao {
  constructor(flag) {
    this.flag = flag;
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
  }
  saveFavoriteItem(key, value) {
    AsyncStorage.setItem(key, value)
      .then(res=>{
        this.updateFavoriteKeys(key, true);
      })
      .catch(e=>console.log(e));
  }
  removeFavoriteItem(key) {
    AsyncStorage.removeItem(key)
      .then(res=>{
        this.updateFavoriteKeys(key, false);
      })
      .catch(e=>console.log(e));
  }
  updateFavoriteKeys(key, isAdd){
    AsyncStorage.getItem(this.favoriteKey)
      .then(res=>{
        let favoriteKeys = [];
        if (res) {
          favoriteKeys = JSON.parse(res);
        }
        let index = favoriteKeys.indexOf(key);
        if (isAdd) {
          if (index === -1) favoriteKeys.push(key);
        } else {
          if (index >= 0) favoriteKeys.splice(index, 1);
        }
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
      })
      .catch(err=>console.log(err));
  }
  getFavoriteKeys(){
    return AsyncStorage.getItem(this.favoriteKey)
      .then(res => {
        return (JSON.parse(res));
      })
      .catch(e=>console.log(e));
  }
  getAllItems() {
    return new Promise((resolve,reject)=> {
      this.getFavoriteKeys()
        .then(keys=>{
          let items = [];
          if (keys) {
            AsyncStorage.multiGet(keys, (err, stores) => {
              try {
                stores.map((result, i, store) => {
                  let key = store[i][0];
                  let value = store[i][1];
                  if (value)items.push(JSON.parse(value));
                });
                resolve(items);
              } catch (e) {
                reject(e);
              }
            });
          } else {
            resolve(items);
          }
        })
        .catch(e=>{reject(e)})
    })
  }
}

