import React, {Component} from 'react';
import { connect } from 'react-redux';
import { tracker } from '../../lib/googleAnalytics';
import { loginInit, loginWithGoogle } from './actions';
import { View, AsyncStorage } from 'react-native';
import { Login, AppIntro } from '../../components';

const mapStateToProps = ({user}) => ({
	user
})

class LoginContainer extends Component{


	constructor(props) {
	  super(props);
	
	  this.state = {
	  	saw_intro: true
	  };
	}

	componentDidMount(){
		tracker.trackScreenView('Login')

		this.props.dispatch(loginInit())

		AsyncStorage.getItem('saw_intro')
			.then(saw_intro => {
				if (saw_intro){
					this.setState({
						saw_intro: true
					})
				}else{
					this.setState({
						saw_intro: false
					})
				}
			})

	}


	render(){
		return (
			<View style={{flex: 1}}>
				{
					this.state.saw_intro ? (
						<Login 
							user={this.props.user} 
							onGoogleLogin={(access_token) => this.handleGoogleLogin(access_token)}
						/>
					) : (

						<AppIntro 
							onLoginPressed={() => this.finishedIntro()}
						/>
					)
				}
			
			</View>
		)
	}

	handleGoogleLogin(access_token){
		this.props.dispatch(loginWithGoogle(access_token))
	}

	finishedIntro(){
  		AsyncStorage.setItem('saw_intro', 'true');
  		this.setState({
  			saw_intro: true
  		})

	}
}

export default connect(mapStateToProps)(LoginContainer)