import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class TrendingCell extends Component{
  constructor(props) {
    super(props);
  }
  onPressFavorite = () => {
    let isFavorite = !this.props.projectModel.isFavorite;
    this.props.onFavorite(isFavorite);
  };
  getIcon = isFavorite => {
    return isFavorite
      ? require('../../res/images/ic_star.png')
      : require('../../res/images/ic_unstar_transparent.png')
  };
  render() {
    const {projectModel, onSelect} = this.props;
    let data = projectModel && projectModel.item ? projectModel.item : {};
    let description = `<p>${data.description}</p>`;
    let favoriteButton = (
      <TouchableOpacity onPress={this.onPressFavorite}>
        <Image
          style={[styles.image, {tintColor: '#2196f3'}]}
          source={this.getIcon(projectModel.isFavorite)} />
      </TouchableOpacity>
    );
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
            {favoriteButton}
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
    marginRight: 2
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
