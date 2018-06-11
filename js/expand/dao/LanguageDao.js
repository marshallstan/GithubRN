import React from 'react';
import {AsyncStorage} from 'react-native';
import keys from '../../../res/data/keys.json';
import langs from '../../../res/data/langs.json';

export let FLAG_LANGUAGE = {
  flag_language: 'flag_language_language',
  flag_key: 'flag_language_key',
};

export default class LanguageDao {
  constructor(flag) {
    this.flag = flag;
  }
  fetch() {
    return (
      AsyncStorage.getItem(this.flag)
        .then(res=>{
          if (res) {
            return JSON.parse(res);
          } else {
            let data = this.flag === FLAG_LANGUAGE.flag_language ? langs : keys;
            this.save(data);
            return data;
          }
        })
    )
  }
  save(data) {
    AsyncStorage.setItem(this.flag, JSON.stringify(data))
      .catch(err=>{})
  }
}