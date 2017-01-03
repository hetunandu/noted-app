import React, {Component} from 'react';
import {
	View, 
	Text
} from 'react-native';
import styles from './styles';

class Navbar extends Component{
	render(){
		return(
			<View style={styles.navBar}>
				<Text style={styles.navbarTitle}>{this.props.title}</Text>
			</View>
		)
	}
}

export default Navbar