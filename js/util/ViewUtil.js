import React from 'react';
import {
  Image,
  TouchableOpacity
} from 'react-native';

export const getButton = (callback, image) => (
  <TouchableOpacity onPress={()=>callback()}>
    <Image
      style={{width: 23, height: 23, margin: 5}}
      source={image || require('../../res/images/ic_arrow_back_white_36pt.png')} />
  </TouchableOpacity>
);