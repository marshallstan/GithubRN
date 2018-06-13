import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';

export default class MyPage extends Component {
  static navigationOptions = ({navigation}) => {
    let renderButton = image => (
      <TouchableOpacity onPress={()=>{navigation.goBack()}}>
        <Image
          style={{width: 23, height: 23, margin: 5}}
          source={image} />
      </TouchableOpacity>
    );
    return {
      header: (
        <NavigationBar
          title="My"
          leftButton={
            renderButton(require('../../../res/images/ic_arrow_back_white_36pt.png'))
          }
          rightButton={
            renderButton(require('../../../res/images/ic_star.png'))
          } />
      ),
    };
  };
  render() {
    return (
      <View style={styles.page}>
        <Text
          onPress={()=>{
            this.props.navigation.navigate("CustomKeyPage", {
              flag: FLAG_LANGUAGE.flag_key
            })
          }}
          style={styles.text}>
          key
        </Text>
        <Text
          onPress={()=>{
            this.props.navigation.navigate("CustomKeyPage", {
              flag: FLAG_LANGUAGE.flag_language
            })
          }}
          style={styles.text}>
          language
        </Text>
        <Text
          onPress={()=>{
            this.props.navigation.navigate("SortKeyPage", {
              flag: FLAG_LANGUAGE.flag_key
            })
          }}
          style={styles.text}>
          key sort
        </Text>
        <Text
          onPress={()=>{
            this.props.navigation.navigate("SortKeyPage", {
              flag: FLAG_LANGUAGE.flag_language
            })
          }}
          style={styles.text}>
          language sort
        </Text>
        <Text
          onPress={()=>{
            this.props.navigation.navigate("CustomKeyPage", {
              isRemoveKey: true
            })
          }}
          style={styles.text}>
          key delete
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: 'green'
  }
});