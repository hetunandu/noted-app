import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import Explanation from './Explanation';

class Question extends React.Component {

	render() {
		return (
			<View style={styles.question}>
				<Text style={styles.questionText}>Q. {this.props.concept.questions[0]}</Text>
				<View style={{paddingBottom: 60}}>
				{
					this.props.showAns && (
						<Explanation explanation={this.props.concept.explanation}/>
					)
				}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	question:{
		alignItems: 'center',
	},
	conceptName: {
		textAlign: 'center',
		fontSize: 18,
		color: "#999",
		marginBottom: 20
	},
	questionText:{
		fontSize: 23,
		textAlign: 'center'
	},
})

export default Question;
