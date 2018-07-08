import React, { Component } from 'react';
import {  Dimensions,StyleSheet, View, Text, } from 'react-native';

export default class DonorInfo extends Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Gender</Text>
                <Text style={styles.value}>{this.props.donor.gender == 'M' ? 'Male' : 'Female'}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Date of Birth</Text>
                <Text style={styles.value}>{this.props.donor.bdate}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Address</Text>
                <Text style={styles.value}>{this.props.donor.address}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Status</Text>
                {this.donationStatus()}
            </View>
        </View>
    );
  }

  donationStatus(){
      if(this.props.donor.status == 'Y' || this.props.donor.status == ''){
          return <Text style={{color:'#06D6A0',fontSize:14, width:'auto', marginLeft:5, height:20}}>May Donate</Text>;
      }
      return <Text style={{color:'#EF476F',fontSize:14, width:'auto', marginLeft:5, height:20}}>Can not Donate</Text>
  }
}

const styles = StyleSheet.create({
    container : {flex: 0, flexDirection: 'column',width:Dimensions.get('window').width,height:'auto'},
    row : {flex:1,height: 20,marginBottom: 10,width:200, padding:10, paddingTop:5, paddingBottom:5, flexDirection:'row'},
    label : {
      fontSize:14, color:'#118AB2', width:'auto', minWidth:120, height:20, justifyContent: 'flex-end',
    },
    value : {
      fontSize:14, color : '#26547C', width:'auto', marginLeft:5, height:20
    }
  })