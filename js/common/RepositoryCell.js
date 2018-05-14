import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

export default class RepositoryCell extends Component{
  render() {
    const {data} = this.props;
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.cell_container}>
          <Text style={styles.title}>{data.full_name}</Text>
          <Text style={styles.des}>{data.description}</Text>
          <View style={styles.rowBottom}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>Author: </Text>
              <Image
                style={styles.image}
                source={{uri: data.owner.avatar_url}} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>Stars: </Text>
              <Text>{data.stargazers_count}</Text>
            </View>
            <Image style={styles.image} source={require('../../res/images/ic_star.png')} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    width: 22,
    height: 22,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  des: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  },
  cell_container: {
    backgroundColor: '#fff',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: .5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: .5, height: .5},
    shadowOpacity: .4,
    shadowRadius: 1,
    elevation: 2,
  }
});
