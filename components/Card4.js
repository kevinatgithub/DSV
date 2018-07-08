import React from 'react';
import {View,StyleSheet,Text} from 'react-native';

export default class Card4 extends React.Component{

    render(){
        return (<View style={{margin:10}}>
            <View style={style.heading}>
                <Text style={{color:'#fff'}}>{this.props.title}</Text>
            </View>
            <View style={style.body}>
                {this.props.children}
            </View>
        </View>)
    }
}

const style = StyleSheet.create({
    heading : {
        backgroundColor : '#118AB2',
        height:'auto',
        padding:10
    },
    body : {
        borderWidth:1,
        borderColor: '#118AB2',
        height:'auto',
        padding:10
    }
})