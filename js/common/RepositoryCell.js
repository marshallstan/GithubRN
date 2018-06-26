import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

export default class RepositoryCell extends Component{
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
    let {projectModel, onSelect} = this.props;
    let data = projectModel && projectModel.item ? projectModel.item : {};
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
