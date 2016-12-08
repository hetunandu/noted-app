import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Alert,
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
					{
						this.props.user.isAuthenticated ? (
							<View>
								<Text style={styles.welcome}>
									Welcome back!
								</Text>
							</View>
						)
						:
						(
							<View>
								<Text style={styles.welcome}>
									Welcome to Noted!
								</Text>
								{
									this.props.user.isFectching ? <Loading /> : (
										<GoogleSigninButton
											style={{width: 312, height: 48}}
											size={GoogleSigninButton.Size.Wide}
											color={GoogleSigninButton.Color.Light}
											onPress={this._signIn.bind(this)}
										/>
									)
								}
								<Text>{this.props.user.errorMessage}</Text>
							</View>
						)
					}
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
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	welcome: {
		fontSize: 25,
		color: 'white',
		textAlign: 'center',
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