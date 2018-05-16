import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import {getButton} from '../../util/ViewUtil';

export default class CustomKeyPage extends Component {
  static navigationOptions = ({navigation}) => {
    let goBack = navigation.goBack;
    let rightBtn = (
      <TouchableOpacity onPress={()=>{}}>
        <View style={{margin: 10}}>
          <Text style={styles.title}>保存</Text>
        </View>
      </TouchableOpacity>
    );
    return {
      header: (
        <NavigationBar
          title="自定义标签"
          leftButton={
            getButton(goBack)
          }
          rightButton={rightBtn} />
      ),
    };
  };
  renderView = () => {

  };
  render() {
    return (
      <View style={styles.page}>
        <ScrollView>
          {this.renderView()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: 'white'
  }
});