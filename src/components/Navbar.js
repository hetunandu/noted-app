import React, {Component} from 'react';
import {
	View, 
	Text,
	StyleSheet,
	TouchableHighlight,
	Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';


class Navbar extends Component{
	render(){
		return(
			<View style={styles.navBar}>
				<Text style={styles.navbarTitle}>{this.props.title}</Text>
				<View style={styles.pointsContainer}>
					<Image 
						source={require('../images/icon.png')}
						style={{width: 20, height: 20, borderRadius: 50}} 
					/>
					<Text style={styles.points}>{this.props.user.data.points}</Text>
				</View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	navBar:{
		padding: 10,
		backgroundColor: '#50537f',
		borderBottomColor: '#404265',
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 5
	},
	navbarTitle:{
		fontSize: 23,
		fontWeight: '600',
		color: 'white'
	},
	pointsContainer: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	points:{
		fontSize: 30,
		fontWeight: 'bold',
		color: 'white',
		marginLeft: 5
	}
})


const mapStateToProps = ({user}) => ({
	user
})



export default connect(mapStateToProps)(Navbar)