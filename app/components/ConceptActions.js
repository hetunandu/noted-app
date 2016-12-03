import React from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet
} from 'react-native'

class ConceptActions extends React.Component {
    render() {
        return (
        	<View style={styles.cardActions}>
        		{
        			this.props.failText && (
        				<TouchableHighlight 
        				    onPress={() => this.props.failPressed()}
        				    style={[styles.btn, {backgroundColor: "#E83B40"}]}
        				    underlayColor="#d03539"
        				>
        				    <Text style={styles.btnText}>{this.props.failText}</Text>
        				</TouchableHighlight>
        			)
        		}
        		{
        			this.props.successText && (
        				<TouchableHighlight 
        				    onPress={() => this.props.successPressed()}
        				    style={[styles.btn, {backgroundColor: "#2E7F2E"}]}
        				    underlayColor="#297229"
        				>
        				    <Text style={styles.btnText}>{this.props.successText}</Text>
        				</TouchableHighlight>
        			)
        		}
        		{
        			this.props.neutralText && (
        				<TouchableHighlight 
        				    onPress={() => this.props.neutralPressed()}
        				    style={[styles.btn, {backgroundColor: "#333"}]}
        				    underlayColor="#444"
        				>
        				    <Text style={styles.btnText}>{this.props.neutralText}</Text>
        				</TouchableHighlight>
        			)
        		}
        	</View>
        );
    }
}

const styles = StyleSheet.create({
	cardActions: {
        flex: 1,
	    flexDirection: 'row',
	    justifyContent: 'space-around',
	},
	btn:{
	    flex: 1,
        padding: 10,
        alignSelf: 'stretch',
	    alignItems: 'center',
	    justifyContent: 'center',
	    flexWrap: 'wrap'
	},
	btnText:{
	    color: 'white',
	    fontSize: 22
	}
})
export default ConceptActions;
