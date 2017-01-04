import React, {Component} from 'react';
import {
	View, 
	Text,
	TouchableHighlight
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'


const mapStateToProps = ({user}) => ({
	user
})


class Navbar extends Component{
	render(){
		return(
			<View style={styles.navBar}>
				<Text style={styles.navbarTitle}>{this.props.title}</Text>
				<TouchableHighlight 
					onPress={() => Actions.points()}
				>
					<View style={styles.pointsContainer}>
						<Text style={styles.points}>{this.props.user.data.points} kp</Text>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}

export default connect(mapStateToProps)(Navbar)