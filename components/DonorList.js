import React, { Component } from 'react';
import {  View, Text, FlatList } from 'react-native';

const SQLite = require('react-native-sqlite-storage');
const db = SQLite.openDatabase({name : 'nbbnets', createFromLocation : "~nbbnets.db"});

export default class DonorList extends Component {
  state = {
      donors : []
  }

  componentDidMount(){
    db.transaction(tx => {
            
        tx.executeSql(
            `SELECT * FROM donors LIMIT 10;`,
            [],
            (tx, results) => {
                results.rows.map((row) => {
                    row.item.key = "" +row.item.id;
                });
                this.setState({donors:results.rows});
            }
        );
    }, err => alert(JSON.stringify(err)));
  }

  render() {
    return (
      <View style={{margin:10}}>
        <Text>{JSON.stringify(this.state.donors)}</Text>
        <FlatList
        data={this.state.donors}
        renderItem={({item}) => <Text>{JSON.stringify(item)}</Text>}
        />
      </View>
    );
  }
}
