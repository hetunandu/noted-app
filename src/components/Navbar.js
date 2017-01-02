import React, {Component} from 'react';
import {
	View, 
	Text,
	StyleSheet,
	TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import UserPoints from './UserPoints';


class Navbar extends Component{
	render(){
		return(
			<View style={styles.navBar}>
				<Text style={styles.navbarTitle}>{this.props.title}</Text>
				<TouchableHighlight
					underlayColor="#50537f"
					onPress={() => Actions.points()}
				>	
					<View>
						<UserPoints points={this.props.user.data.points}/>
					</View>
				</TouchableHighlight>
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
	}
})


const mapStateToProps = ({user}) => ({
	user
})



export default connect(mapStateToProps)(Navbar)