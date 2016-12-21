import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	Animated,
	Easing,
	TouchableHighlight,
	Dimensions
} from 'react-native';
import Explanation from './Explanation';
import Question from './Question';

class ConceptCard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			translateX: new Animated.Value(0)
		};
	}


	componentDidMount() {
		var {width} = Dimensions.get('window');
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

	_renderCard(){
		switch(this.props.mode){
			case 'study':
				return (
					<Explanation
						explanation={this.props.concept.explanation}
						references={this.props.concept.references}
						tips={this.props.concept.tips}
					/>
				)
			case 'question':
				return (
					<Question
						name={this.props.concept.name}
						question={this.props.concept.questions[0]}
					/>
				);
			case 'answer':
				return (
					<Explanation
						explanation={this.props.concept.explanation}
						references={this.props.concept.references}
						tips={this.props.concept.tips}
					/>
				)
			default:
				return <Text>Unkown mode</Text>
		}
	}

	render(){

		return(
			<Animated.View
				style={[
					styles.card,
					{
						transform: [
							{translateX: this.state.translateX}
						]
					}
				]}
			>
				{
					this._renderCard()
				}
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	card: {
		flex: 7,
		backgroundColor: 'white',
		elevation: 2,
	}
})

export default ConceptCard
