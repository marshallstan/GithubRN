import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import NavigationBar from './NavigationBar';
import Toast from 'react-native-root-toast';

export default class FlatListTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.onLoad();
  }
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
          title="FlatListTest"
          statusBar={{
            backgroundColor: '#ee6363'
          }}
          leftButton={
            renderButton(require('../../res/images/ic_arrow_back_white_36pt.png'))
          }
          rightButton={
            renderButton(require('../../res/images/ic_star.png'))
          }
          style={{
            backgroundColor: '#ee6363'
          }} />
      ),
    };
  };
  renderRow = item => {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          onPress={()=>{
            Toast.show('This is a message', {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
              onShow: () => {
                // calls on toast\`s appear animation start
              },
              onShown: () => {
                // calls on toast\`s appear animation end.
              },
              onHide: () => {
                // calls on toast\`s hide animation start.
              },
              onHidden: () => {
                // calls on toast\`s hide animation end.
              }
            })
          }}>
          <Text style={styles.text}>{item.key}</Text>
          <Text style={styles.text}>{item.email}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderSeparator = () => <View style={styles.line} />;
  renderFooter = () => <Image style={{width: '100%', height: 100}} source={{uri: 'https://images.gr-assets.com/hostedimages/1406479536ra/10555627.gif'}} />;
  onLoad = () => {
    setTimeout(()=>{
      this.setState({
        isLoading: false
      })
    }, 2000)
  };
  render() {
    const data = [
      {email: "1@qq.com", key: "1"},
      {email: "2@qq.com", key: "2"},
      {email: "3@qq.com", key: "3"},
      {email: "4@qq.com", key: "4"},
      {email: "5@qq.com", key: "5"},
      {email: "6@qq.com", key: "6"},
      {email: "7@qq.com", key: "7"},
      {email: "8@qq.com", key: "8"},
      {email: "9@qq.com", key: "9"}
    ];
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          renderItem={({item}) => this.renderRow(item)}
          onRefresh={this.onLoad}
          refreshing={this.state.isLoading}
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
  },
  text: {
    fontSize: 20
  },
  line: {
    height: 1,
    backgroundColor: 'black'
  }
});
