import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import { AppRegistry, StatusBar} from 'react-native';
import {
	Router,
	Scene,
	Actions,
	ActionConst
} from 'react-native-router-flux';
import api from './lib/api';
import Login from './components/Login';
import LoginDetails from './components/LoginDetails';
import Subjects from './components/Subjects';
import ConceptReader from './components/ConceptReader';
import SubjectIndex from './components/SubjectIndex';
import Result from './components/Result';
import Home from './components/Home';

var RequiresConnection = require('react-native-offline-mode')

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

const navBarStyles = {
	backgroundColor: '#50537f',
	borderBottomColor: '#404265',
	height: 60,
	elevation: 5
}

const navBarTitleStyles = {
	fontSize: 23,
	fontWeight: '600',
	color: 'white',
	textAlign: 'left',
	marginLeft: 10,
	alignSelf: 'flex-start'
}

// Routes
const scenes = Actions.create(
	<Scene key="root"
		hideNavBar={true}
		panHandlers={null}
	>
		<Scene
			key="login"
			title="Login"
			component={Login}
			initial={true}
			type={ActionConst.REPLACE}
		/>
		<Scene
			key="loginDetails"
			title="Finish Login"
			panHandlers={null}
			component={LoginDetails}
			type={ActionConst.REPLACE}
		/>
		<Scene
			key="home"
			hideNavBar
			component={Home}
		/>
		<Scene 
			key="subjectIndex"
			title="Index"
			panHandlers={null}
			component={SubjectIndex}
		/>
		<Scene
			key="conceptReader"
			panHandlers={null}
			component={ConceptReader}
			hideNavBar
		/>
		<Scene
			key="resultPage"
			panHandlers={null}
			component={Result}
			type={ActionConst.REPLACE}
			hideNavBar
		/>
	</Scene>
	);

const ReduxRouter = connect()(Router);

const containerStyles = {
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
					sceneStyle={containerStyles}
				/>
			</Provider>
			)
	}
}

export default RequiresConnection(Noted)
