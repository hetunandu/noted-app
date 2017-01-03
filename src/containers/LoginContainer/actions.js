import {AsyncStorage, ToastAndroid} from 'react-native';
import {GoogleSignin} from 'react-native-google-signin';
import Api, {BASE_URL} from '../../lib/api';
import {tracker} from '../../lib/googleAnalytics';
import {Actions} from 'react-native-router-flux';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE
} from './types';



// Find a token and try to find the user from it
export function loginInit(){
	
	return dispatch => {
		
		dispatch(loginRequest())
		
		AsyncStorage.getItem('login_token')
			.then((token) => {
				if(token){
					let config = {
						headers: {
							'Accept': 'application/json',
							'Content-Type':'application/json',
							'Authorization': token,
							'User-Agent': "AndroidApp"
						}
					};

					return fetch(`${BASE_URL}user`, config)
						.then(res => res.json())
						.then(json => {
							if(json.success === false){
								dispatch(loginFailed(json.error))
							}else{
								// Dispatch the success action
								dispatch(loginSuccess(json.message.user))
							}
						})
						.catch(err => dispatch(loginFailed(err)))
				}else{
					// Dispatch an action to signify no token is found
					dispatch(loginFailed())
					googleAuthInit()
				}
			})
			.done()
	}
}


export function loginWithGoogle(access_token) {

	let config = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type':'application/json',
			'User-Agent': "AndroidApp"
		},
		body: JSON.stringify({
			id_token: access_token
		})
	};

	return dispatch => {
		dispatch(loginRequest())
		return fetch(`${BASE_URL}login`, config)
			.then(res => res.json())
			.then(json => {
				if(json.success === false){
					dispatch(loginFailed(json.error))
				}else{
					AsyncStorage.setItem('login_token', json.message.token);
					dispatch(loginSuccess(json.message.user))
				}
			})
			.catch(err => console.warn(err))
	}
}



// Actions to be called out

function loginRequest(){
	return {
		type: LOGIN_REQUEST
	}
}
function loginSuccess(user){
	tracker.setUser(user.key);
	if (!user.course || !user.college){
		Actions.loginDetails()
		// Not implemented yet
	}else{
		Actions.home()
	}
	return {
		type: LOGIN_SUCCESS,
		user
	}
}

function loginFailed(error){
	return{
		type: LOGIN_FAILURE,
		error
	}
}


function googleAuthInit(){
	GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
		GoogleSignin.configure({
			webClientId: '865864307125-gob0frva3ifb10ahm39nrj4e1hi74jeq.apps.googleusercontent.com'
		})
	})
	.catch((err) => {
		ToastAndroid.show(`Play services error: ${err.code} ${err.message}`, ToastAndroid.SHORT)
	})
}

