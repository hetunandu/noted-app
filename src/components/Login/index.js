import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	Alert
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import Loading from '../Loading';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import { logo } from '../../images';

class Login extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.welcome}>
					<Image
						source={logo}
						style={{width: 300, height: 100}}
						resizeMode="contain"
					/>
				</View>

				<View style={styles.login}>
					{ this.props.user.isFectching && <Loading /> }

					{this.renderGoogleAuthBtn()}

					<Text>{this.props.user.errorMessage}</Text>
				</View>
			</View>
		);
	}


	renderGoogleAuthBtn(){

		const {user} = this.props

		if (!user.isAuthenticated && !user.isFetching){
			return (
				<GoogleSigninButton
					style={{width: 230, height: 48, alignSelf: 'center'}}
					size={GoogleSigninButton.Size.Standard}
					color={GoogleSigninButton.Color.Dark}
					onPress={() => this._signIn()}
				/>
			)
		}
	}

	_signIn(){
		GoogleSignin.signIn()
			.then((user) => {
				this.props.onGoogleLogin(user.idToken)
			})
			.catch((err) => {
				console.warn(err)
			})
			.done();
	}
}

export default Login
