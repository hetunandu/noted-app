import React from 'react';
import{
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	Picker,
	TouchableHighlight,
	ToastAndroid
} from 'react-native';
import Loading from './Loading';
import {connect} from 'react-redux';
import {submitCourse } from '../actions/courses';
import { Actions } from 'react-native-router-flux';

class LoginDetails extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			college: ''
		};
	}

	componentDidMount(){
	}

	submitDetails(){
		if(this.state.college.length < 2){
			ToastAndroid.show('Please fill all details', ToastAndroid.LONG);
		}else{
			this.props.submitCourse(this.state.college)
		}
	}

	componentDidUpdate(){
		if(this.props.courses.subscribed){
			Actions.subjects({type: 'reset'});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				
				<Image 
					source={{uri: this.props.user.data.picture_uri}}
					style={{width: 90, height: 90, borderRadius: 50}} 
				/>
				
				<Text style={{ fontSize: 20}}>
					Welcome {this.props.user.data.name}!
				</Text>
				
				<Text style={{ fontSize: 25 }}> 
					Fill in to finish login
				</Text>
				
				<Text style={styles.label}>
					Course:
				</Text>
				
				<TextInput
					style={{height: 40, width: 300}}
					value="HSC Commerce"
					editable={false}
				/>
				<Text>We currently have support only for HSC Commerce</Text>

				<Text style={styles.label}>
					College name:
				</Text>
				
				<TextInput
					autoFocus={true}
					style={{height: 40, width: 300}}
					onChangeText={(text) => this.setState({college: text})}
					value={this.state.college}
				/>

				<TouchableHighlight
					style={styles.submitBtn}
					onPress={() => this.submitDetails()}
				>
					<Text style={{fontSize: 25, color: 'white'}}>Start Studying!</Text>							
				</TouchableHighlight>

			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		margin: 10,
		marginTop: 60,
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 2,
		elevation: 2
	},
	label: { 
		alignSelf: 'flex-start',
		fontSize: 20,
		marginTop: 10,
		marginBottom: 5 
	},
	submitBtn: {
		padding: 15,
		backgroundColor: '#2E7F2E',
		alignItems: 'center',
		alignSelf: 'stretch'
	}
})

const mapStateToProps = ({user, courses}) => ({
	user,
	courses
})

const mapDispatchToProps = dispatch => ({
	submitCourse: (college) => {dispatch(submitCourse(college))}
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginDetails);
