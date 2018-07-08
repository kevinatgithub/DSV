import React, { Component } from 'react';
import {  View } from 'react-native';
import Card1 from './Card1';
import Card3 from './Card3';
import DonorInfo from './DonorInfo';
import DonationHistory from './DonationHistory';

export default class Single extends Component {
  render() {
    return (
      <View>
          <Card1 title={this.props.donor.name}>
                <View style={{height:'auto'}}>
                    <DonorInfo donor={this.props.donor}></DonorInfo>
                    <Card3 title='Donation History'>
                        <View style={{height:'auto'}}>
                            <DonationHistory donor={this.props.donor}></DonationHistory>
                        </View>
                    </Card3>
                </View>
            </Card1>
      </View>
    );
  }
}
