import React, {Component} from 'react';
import { connect } from 'react-redux';
import { tracker } from '../../lib/googleAnalytics';
import { loginInit, loginWithGoogle } from './actions';
import { View } from 'react-native';
import { Login } from '../../components';

const mapStateToProps = ({user}) => ({
	user
})

class LoginContainer extends Component{

	componentDidMount(){
		tracker.trackScreenView('Login')

		this.props.dispatch(loginInit())
	}

	render(){
		return (
			<View style={{flex: 1}}>
				<Login 
					user={this.props.user} 
					onGoogleLogin={(access_token) => this.handleGoogleLogin(access_token)}
				/>
			</View>
		)
	}

	handleGoogleLogin(access_token){
		this.props.dispatch(loginWithGoogle(access_token))
	}
}

export default connect(mapStateToProps)(LoginContainer)