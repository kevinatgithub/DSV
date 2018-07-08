import React from 'react';
import {View,Text,Button,Dimensions} from 'react-native';
const ProgressBar = require('ProgressBarAndroid');
const api_url = 'http://test.nbbnets.net/pbc/public/api/app/';

const SQLite = require('react-native-sqlite-storage');
const db = SQLite.openDatabase({name : 'nbbnets', createFromLocation : "~nbbnets.db"});

export default class Updater extends React.Component{

    state = {
        loading :false, size : 0, donor_count : 0
    }

    componentDidMount(){
        this.count();
    }

    count(){
        db.transaction(tx => {
            
            tx.executeSql(
                `SELECT * FROM donors;`,
                [],
                (tx, results) => this.setState({donor_count:results.rows.length})
            );
        });
    }

    sync(){
        this.setState({loading:true});

        this.clearDonors();

        fetch(api_url+"checkupdates/count")
        .then(result => result.json())
        .then(result => {
            this.setState({size : result.size});
            let rounds = Math.round(result.size/1000) + 1;
            for(var i = 1; i <= rounds; i++){
                fetch(api_url+'checkupdates/1000?page='+i)
                .then(result => result.json())
                .then(({data}) => {
                    data.forEach( donor => {
                        this.insert(donor);
                    })
                    // alert(JSON.stringify(data));
                })
            }
            this.setState({loading:false})
        })
    }

    syncDemo(){
        this.setState({loading:true});

        this.clearDonors((tx) => {
            this.setState({donor_count : 0});
            
            fetch(api_url+"checkupdates/count2")
            .then(result => result.json())
            .then(result => {
                this.setState({size : result.size});
                let rounds = Math.round(result.size/1000) + 1;
                for(var i = 1; i <= rounds; i++){
                    fetch(api_url+'checkupdates2/1000?page='+i)
                    .then(result => result.json())
                    .then(({data}) => {
                        data.forEach( donor => {
                            this.insert(donor);
                        })
                        // alert(JSON.stringify(data));
                    })
                }
                this.setState({loading:false})
            })
        });

    }

    clearDonors(cb){
        db.transaction(tx => {         
            tx.executeSql(
                `DELETE FROM donors;`,[],(tx,res) => cb(tx)
            );
        },err => alert(JSON.stringify(err)));
    }

    insertDummy(){
        db.transaction(tx => {
            tx.executeSql(
                'insert into donors (seqno, name, gender, bdate, address, status) values (?,?,?,?,?,?)',
                ['123','Kevin Cainday','M','January 30, 1989','songco','Y'],
                (tx,res) => this.count()
            )
        }, err => alert(JSON.stringify(err)));
    }

    insert(donor){
        db.transaction(
            tx => {
                tx.executeSql('insert into donors (seqno, name, gender, bdate, address, status) values (?,?,?,?,?,?)', [
                    donor.seqno,
                    donor.donor_name,
                    donor.gender,
                    donor.bdate,
                    (donor.address ? donor.address : ''),
                    (donor.donation_stat ? donor.donation_stat : 'Y')
                ],(tx,res) => this.count());
            }, err => alert(JSON.stringify(err))
        );
    }

    render(){
        return (
            <View style={{alignItems:'center'}}>
                <Text style={{marginTop:50}}>Current Database has {this.state.donor_count} donors.</Text>
                <View style={{margin:30,padding:30,alignItems:'center'}}>
                    {!this.state.loading ? <View style={{flexDirection:'row',width:Dimensions.get('window').width,justifyContent: 'space-around',}}>
                        <Button onPress={this.sync.bind(this)} title="Sync with Server" />
                        <Button onPress={this.syncDemo.bind(this)} title="Sync Demo" />
                        {/* <Button onPress={this.insertDummy.bind(this)} title="Dummy Insert" /> */}
                    </View> : <View style={{width:Dimensions.get('window').width, padding:20}}>
                        <Text>Syncing..</Text>
                        <ProgressBar styleAttr="Horizontal" />
                    </View>}
                                    
                </View>
            </View>
        );
    }
}