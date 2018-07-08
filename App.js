import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {TabView,SceneMap,TabBar} from  'react-native-tab-view';
import Search from './components/Search';
import DonorList from './components/DonorList';
import Updater from './components/Updater';

const SQLite = require('react-native-sqlite-storage');
const db = SQLite.openDatabase({name : 'nbbnets', createFromLocation : 1});

export default class App extends React.Component {
  state = {
    index : 0,
    routes : [
      {key:'search',title : 'Donor Verifier'},
      {key:'register',title : 'Register Donor'},
      {key:'updater',title : 'Sync with Server'},
    ],
    scenes : SceneMap({
      search : Search,
      register : DonorList,
      updater : Updater
    })
  }

  componentDidMount() {
    
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS donors (
          id	INTEGER PRIMARY KEY AUTOINCREMENT,
          seqno	TEXT NOT NULL,
          name	TEXT NOT NULL,
          gender	TEXT NOT NULL,
          bdate	TEXT NOT NULL,
          address	TEXT NOT NULL,
          status	TEXT NOT NULL
        );`
      );
    },(result) => {
      console.log('db created failed');
    });
  }


  _renderTabBar = props => <TabBar {...props} style={{paddingTop:20,backgroundColor:'#073B4C'}} />

  render() {
    return (
      <TabView
        style={styles.container}
        navigationState={this.state}
        renderScene={this.state.scenes}
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this.setState({index})}
        initialLayout={{height:Dimensions.get('window').height, width:Dimensions.get('window').width}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF9',
  },
});
