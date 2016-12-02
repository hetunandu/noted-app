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
	    position: 'absolute',
	    bottom: 0,
	    right: 0,
	    left: 0,
	    flexDirection: 'row',
	    justifyContent: 'space-around',
	},
	btn:{
	    padding: 20,
	    flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	    flexWrap: 'wrap'
	},
	btnText:{
	    textAlign: 'center',
	    color: 'white',
	    fontSize: 22
	}
})
export default ConceptActions;
