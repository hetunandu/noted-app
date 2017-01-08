import React, {Component} from 'react';
import {
	View, 
	Text,
	TouchableHighlight,
	Image
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {PointsDisplay} from '../../components';

const mapStateToProps = ({points}) => ({
	points
})

class Navbar extends Component{
	render(){
		return(
			<View style={styles.navBar}>
				<Text style={styles.navbarTitle}>{this.props.title}</Text>


				<View style={styles.actions}>
					{ this.props.children }

					<TouchableHighlight
						underlayColor="#50537f"
						onPress={() => Actions.points()}
					>
						<View>
							<PointsDisplay points={this.props.points.balance} />
						</View>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

export default connect(mapStateToProps)(Navbar)