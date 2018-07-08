import React, { Component } from 'react';
import {  View,FlatList,Text } from 'react-native';
import Card4 from './Card4';
import DonorInfo from './DonorInfo';

export default class Matches extends Component {
  render() {
    return (
      <View>
        <FlatList
            data={this.props.matches} 
            renderItem={match => <Card4 title={match.item.name}>
                <DonorInfo donor={match.item} />
            </Card4>}
        />
      </View>
    );
  }
}
