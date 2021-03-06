import Symbol from 'es6-symbol';
import {AsyncStorage, ToastAndroid} from 'react-native'

export const BASE_URL = 'https://noted-api.appspot.com/study/';

// The function that will set the appropriate config and call the API
export async function callApi(endpoint, authenticated, method, body) {

	const token = await AsyncStorage.getItem("login_token");

	let config = {};

	// If call needs to be authenticated, attach token to the headers
	if(authenticated) {
		if(token) {
			config = {
				headers: { 'Authorization': `${token}` }
			}
		}
	}

	// If call needs to be in POST, set the appropriate headers and config
	if(method){
		config.method = method
	}

	if(body){
		config.body = JSON.stringify(body);
		config.headers['Content-type'] = 'application/json'
	}

	config.headers['User-Agent'] = "AndroidApp";

	// Fetch the api
	return fetch(BASE_URL + endpoint, config)
		// Get the json from the response
		.then(response => response.json())
		// Check if the request was a success
		.then(json => {
			// if not success, reject the promise
			if (json.success === false) {
				return Promise.reject(json)
			}

			// Return the json either ways
			return json;

			//Catch any other errors
		}).catch(err => Promise.reject(err))
}

// No idea what this is
export const CALL_API = Symbol('Call API');

// Making it into a middleware i guess
export default store => next => action => {

	const callAPI = action[CALL_API];

	// So the middleware doesn't get applied to every single action
	if (typeof callAPI === 'undefined') {
		return next(action)
	}

	// Get details about the call
	let { endpoint, types, authenticated, method, body, info } = callAPI;

	// Get the request actions
	const [ requestType, successType, errorType ] = types;

	// Calling the request started action
	next({type: requestType});

	// Calling the 'callApi' fn with request data
	return callApi(endpoint, authenticated, method, body, info)
		.then(
			response => next({
				data: response.message,
				type: successType,
				info
			}),
			error => next({
				error: error || 'There was an error.',
				type: errorType,
				info
			})
		)
	}
