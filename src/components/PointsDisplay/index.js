import React, {Component} from 'react';
import {
	View,
	Text,
	Image
} from 'react-native';
import styles from './styles';
import {coin} from '../../images';

class PointsDisplay extends Component{
	render(){
		return(
			<View style={styles.pointsContainer}>
				<Text
					style={[
						styles.points,
						this.props.dark && styles.darkFont

					]}
				>
					{this.props.points}
				</Text>
				<Image source={coin} style={{height: 25, width: 25}}/>
			</View>
		)
	}
}

export default PointsDisplay
