import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Animated,
	Easing,
	TouchableHighlight,
	Dimensions
} from 'react-native';
import Explanation from './Explanation';
import Question from './Question';
import tts from 'react-native-android-speech';


class ConceptCard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			translateY: new Animated.Value(0),
			translateX: new Animated.Value(0)
		};
	}


	componentDidMount() {

		this.animateCardIn()
		
	}

	animateCardIn(){
		var { width } = Dimensions.get('window');
		const startValue = -Math.abs(width)
		this.state.translateX.setValue(startValue)
		Animated.spring(
			this.state.translateX,
			{
				toValue: 0,
				friction: 7
			}
		).start();
	}

	animateCardOut(){
		var {height} = Dimensions.get('window');
		const endValue = -Math.abs(height)
		Animated.spring(
			this.state.translateY,
			{
				toValue: endValue,
				friction: 7
			}
		).start();
	}

	render(){
		var {height} = Dimensions.get('window')
		return(
			<Animated.View
				style={[
					styles.card,
					{
						height: height - 60,
						transform: [
							{translateY: this.state.translateY},
							{translateX: this.state.translateX}
						]
					}
				]}
			>
				{this.props.children}
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	card: {
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 3,
		elevation: 2
	}
})

export default ConceptCard
