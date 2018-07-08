import React from 'react';
import {StyleSheet,View,ScrollView,TextInput,Text} from 'react-native';
const ProgressBar = require('ProgressBarAndroid');
import Single from './Single';
import  Matches from './Matches';

export default class Search extends React.Component{

    state = {
        donor : {
            name : 'Juan Dela Cruz',
            gender : 'M',
            bdate : 'January 30, 1989',
            address : 'Pasay City',
            status : 'Y',
            donations : [
                {key : '0',donation_dt : 'January 30, 2018', facility_name : 'The Medical City'},
                {key : '1',donation_dt : 'January 30, 2018', facility_name : 'The Medical City'},
                {key : '2',donation_dt : 'January 30, 2018', facility_name : 'The Medical City'},
                {key : '3',donation_dt : 'January 30, 2018', facility_name : 'The Medical City'},
            ]
        },
        matches : []
    }

    render(){
        
        return (
            <View>
                <View style={styles.search}>
                    <TextInput style={styles.searchField} underlineColorAndroid="#fff" placeholder="Enter Donor Name"></TextInput>
                </View>
                <ScrollView>

                    {/* <View>
                        <Matches matches={matches}></Matches>
                    </View> */}

                    {/* <View style={{margin:50,alignItems:'center'}}>
                        <ProgressBar />
                        <Text>Please wait..</Text>
                    </View> */}
                    
                    <Single donor={this.state.donor}></Single>



                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    search : {
        backgroundColor : '#073B4C',
        padding:10,
    },
    searchField : {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius:15,
        height:35,
        backgroundColor:'#fff',
        paddingLeft:40
    }
})