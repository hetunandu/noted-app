import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

class Question extends React.Component {

    render() {
        return (
        	<View style={styles.question}>
        	    <Text style={styles.conceptName}>{this.props.name}</Text>
        	    <Text style={styles.questionText}>Q. {this.props.questions}</Text>
        	    {this.props.actions}
        	</View>
        );
    }
}

const styles = StyleSheet.create({
	question:{
	    flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center'
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
