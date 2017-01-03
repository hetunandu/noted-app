import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Navbar} from '../../components';

class HomeContainer extends Component {
	render(){
		return (
			<View style={{flex: 1}}>
				<Navbar title="Home" />
			</View>
		)
	}
}


export default HomeContainer