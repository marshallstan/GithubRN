import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class TrendingCell extends Component{
  render() {
    let {data, onSelect} = this.props;
    let description = `<p>${data.description}</p>`;
    return (
      <TouchableOpacity onPress={onSelect} style={styles.container}>
        <View style={styles.cell_container}>
          <Text style={styles.title}>{data.fullName}</Text>
          <HTMLView
            stylesheet={{
              p: styles.des,
              a: styles.des
            }}
            value={description}
            onLinkPress={()=>{}}
          />
          <Text style={styles.des}>{data.meta}</Text>
          <View style={styles.rowBottom}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.des}>Build by: </Text>
              {
                data.contributors.map((item, i)=>(
                  <Image
                    key={i}
                    style={styles.image}
                    source={{uri: item}} />
                ))
              }
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
