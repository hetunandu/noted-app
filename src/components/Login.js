import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Alert,
	Image,
	ActivityIndicator
} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Loading from './Loading';
import {connect} from 'react-redux';
import {login, checkToken, googleAuthInit} from '../actions/auth';
import { Actions } from 'react-native-router-flux';

class Login extends Component {

	componentDidMount(){
		this.props.googleAuthInit()
		this.props.checkToken()
	}

	componentDidUpdate(){
		if(this.props.user.isAuthenticated){
			if(this.props.user.data.course){
				Actions.subjects({type: 'reset'});
			}else{
				Actions.loginDetails()
			}
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<View style={styles.welcome}>
						<Text style={styles.welcomeText}>
							Welcome to
						</Text>
						<Image 
							source={require('../images/logo.png')}
							style={{width: 300, height: 100}}
							resizeMode="contain"
						/>
					</View>
					<View style={styles.login}>
						{ this.props.user.isFectching && <Loading /> }
								
						{ this.props.user.token == false && (
								<GoogleSigninButton
									style={{width: 230, height: 48, alignSelf: 'center'}}
									size={GoogleSigninButton.Size.Standard}
									color={GoogleSigninButton.Color.Dark}
									onPress={this._signIn.bind(this)}
								/>
							)
						}
						<Text>{this.props.user.errorMessage}</Text>
					</View>
				</View>
			</View>
		);
	}

	_signIn(){
		GoogleSignin.signIn()
			.then((user) => {
				this.props.login(user.idToken)
			})
			.catch((err) => {
				Alert.alert('Sign in Error', JSON.stringify(err))
			})
			.done();
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 60,
		padding: 10,
		flex: 1,
		alignItems: 'center',
	},
	welcome: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	welcomeText: {
		fontSize: 30,
		textAlign: 'center'
	},
	login: {
		flex: 1
	}
});

const mapStateToProps = ({user}) => ({
	user
})

const mapDispatchToProps = dispatch => ({
	login: (token) => {dispatch(login({id_token: token}))},
	checkToken: () => {dispatch(checkToken())},
	googleAuthInit: () => {dispatch(googleAuthInit())}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)