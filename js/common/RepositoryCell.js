import React, { Component } from 'react';
import {View, Text} from 'react-native';

export default class RepositoryCell extends Component{
  render() {
    const {data} = this.props;
    return (
      <View style={{margin: 10}}>
        <Text>{data.full_name}</Text>
        <Text>{data.description}</Text>
        <Text>{data.owner.avatar_url}</Text>
        <Text>{data.stargazers_count}</Text>
      </View>
    );
  }
}
