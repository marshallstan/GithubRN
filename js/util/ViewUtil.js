import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight, StyleSheet
} from 'react-native';
import {MORE_MENU} from "../common/MoreMenu";

export const getButton = (callback, image) => (
  <TouchableOpacity onPress={()=>callback()}>
    <Image
      style={{width: 23, height: 23, margin: 5}}
      source={image || require('../../res/images/ic_arrow_back_white_36pt.png')} />
  </TouchableOpacity>
);

export const getSettingItem = (cab, icon, text, tintStyle, expandableIcon) => {
  return (
    <TouchableHighlight onPress={cab}>
      <View style={styles.item}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={[{width: 18, height: 18, marginRight: 10}, tintStyle]}
            source={icon} />
          <Text>{text}</Text>
        </View>
        <Image
          style={[styles.tiaozhuanIcon, {tintColor: '#2196f3'}]}
          source={expandableIcon || require('../../res/images/ic_tiaozhuan.png')} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 60,
  },
  tiaozhuanIcon: {
    marginRight: 10,
    height: 22,
    width: 22,
  }
});