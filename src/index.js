import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './containers/reducers';
import { AppRegistry, StatusBar} from 'react-native';
import { Router } from 'react-native-router-flux';
import scenes from './routes';
import api from './lib/api';
import RequiresConnection from 'react-native-offline-mode'

// Make a logging middlware
const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});

// Cofigure the store and apply the middlwares
function configureStore(initialState){
	const enhancer = compose(
		applyMiddleware(
			thunkMiddleware,
			api,
			loggerMiddleware,
			)
		);
	// Return the create store function
	return createStore(reducer, initialState, enhancer);
}

// Create the store with an empty object
const store = configureStore({});

const ReduxRouter = connect()(Router);

const sceneStyles = {
	flex: 1,
	backgroundColor: '#DDD',
}

// Base App compoent with the provider

class Noted extends Component{

	componentDidMount(){
		StatusBar.setBackgroundColor("#404265", true)
	}

	render(){
		return (
			<Provider store={store}>
				<ReduxRouter
					scenes={scenes}
					style={{backgroundColor: '#f1f1f1'}}
					sceneStyle={sceneStyles}
				/>
			</Provider>
		)
	}
}

export default RequiresConnection(Noted)
