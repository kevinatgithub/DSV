import React, { Component } from 'react';
import {  FlatList,Dimensions,StyleSheet, View, Text, } from 'react-native';

export default class DonationHistory extends Component {


  

    
  render() {
    

    return (
        <View style={styles.container}>
             <FlatList
                data={this.props.donor.donations}
                renderItem={(d) => 
                    <View style={styles.row}>
                        <Text style={styles.value}>{d.item.donation_dt}</Text>
                        <Text style={styles.value}>{d.item.facility_name}</Text>
                    </View>
                }
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container : {flex: 0, flexDirection: 'column',width:Dimensions.get('window').width,height:'auto'},
    row : {flex:1,height: 20,marginBottom: 10,width:200, padding:10, paddingTop:5, paddingBottom:5, flexDirection:'row'},
    value : {
      fontSize:14, color : '#26547C', width:'auto', margin:0, marginRight:20, height:20
    }
  })