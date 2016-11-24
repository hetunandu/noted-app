import React from 'react';

import {
	DatePickerAndroid,
	View,
	Text,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';


class MakePlan extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	date: new Date(),
	  	chapters: []
	  };
	}

	async pickDate(){
		const {date} = this.state;
		
		try {
			const {action, year, month, day} = await DatePickerAndroid.open({date});
			let newDate = ""
			if (action !== DatePickerAndroid.dismissedAction) {
				// A date was set
				this.setState({
					date: new Date(year, month, day)
				})
				//var dateInMs = date.getTime();
			} else if (action === TimePickerAndroid.dismissedAction) {
				// Do nothing
			}

		} catch ({code, message}) {
			console.warn('Date Picking error', message);
		}

	}

    render() {
    	return (
    		<View style={styles.container}>
    			<View style={styles.card}>
    				<Text style={{fontSize: 25, textAlign: 'center'}}>
    					Make a revision plan and study daily with noted
    				</Text>
    				<Text style={{fontSize: 20, marginTop: 20}}>Target completion date</Text>
    				<TouchableHighlight
    					underlayColor='#f6f6f6'
    					style={{ padding: 10, backgroundColor: '#f1f1f1' }}
    					onPress={() => this.pickDate()}
    				>
    					<Text style={{fontSize: 18}}>{this.state.date.toDateString()}</Text>
    				</TouchableHighlight>
    				<Text style={{fontSize: 20, marginTop: 20}}>Portion</Text>
    				<TouchableHighlight
    					underlayColor='#f6f6f6'
    					style={{ padding: 10, backgroundColor: '#f1f1f1' }}
    				>
    					<Text style={{fontSize: 18}}>Chapter list here</Text>
    				</TouchableHighlight>
    			</View>
    			<TouchableHighlight 
    			    style={styles.buttonContainer}
    			>
    			    <View style={styles.button} >
    			        <Text style={styles.buttonText}>
    			            Make Plan
    			        </Text>
    			        <Icon name="chevron-right" size={50} color="#fff" />    
    			    </View>
    			</TouchableHighlight>
    		</View>
    	);
    }
}

const styles = StyleSheet.create({
	container: {
		marginTop: 60,
		flex: 1
	},
	card: {
		flex: 1,
		backgroundColor: "#fff",
		elevation: 2,
		borderRadius: 3,
		minHeight: 300,
		padding: 10
	},
	buttonContainer: {
		flex: 1,
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0,
		elevation: 2
	},
	button: {
		backgroundColor: '#2E7F2E',
		flexDirection: 'row',
    	justifyContent: 'space-between',
    	padding: 15,
    	alignItems: 'center',
    	borderBottomLeftRadius: 3,
    	borderBottomRightRadius: 3
	},
	buttonText: {
		fontSize: 30,
        color: 'white',
        alignSelf: 'center'
	}
})

export default MakePlan;
