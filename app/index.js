import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import { AppRegistry, StatusBar, UIManager } from 'react-native';
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
import ConceptView from './components/ConceptView';

// Activating Layout Animation Support

UIManager.setLayoutAnimationEnabledExperimental && 
  UIManager.setLayoutAnimationEnabledExperimental(true);

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
    backgroundColor: '#333', 
    borderBottomColor: '#444',
    height: 65,
    elevation: 5
}

const navBarTitleStyles = {
  fontSize: 25,
  fontWeight: '600',
  color: 'white',
  textAlign: 'left',
  marginLeft: 50,
  alignSelf: 'flex-start'
}

// Routes 
const scenes = Actions.create(
    <Scene key="root"
      navigationBarStyle={navBarStyles} 
      titleStyle={navBarTitleStyles}
      backButtonImage={require('./back-arrow.png')}
      leftButtonIconStyle={{height: 36, width: 36}}
      leftButtonStyle={{
        top: 0,
        height: 65,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
      }}
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
          component={LoginDetails}
          type={ActionConst.REPLACE}
        />
        <Scene
          key="subjects"
          title="Subjects"
          component={Subjects}
        />
        <Scene
          key="conceptView"
          component={ConceptView}
          hideNavBar
        />
      </Scene> 
);

const ReduxRouter = connect()(Router);

const containerStyles = {
    flex: 1,
    backgroundColor: '#50537f',
}
// Base App compoent with the provider

class Noted extends Component{

  componentDidMount(){
    StatusBar.setBackgroundColor("#222", true)
  }
  
  render(){
    return (
      <Provider store={store}>
        <ReduxRouter 
          scenes={scenes} 
          style={{backgroundColor: '#50537f'}}  
          sceneStyle={containerStyles}
        />      
      </Provider>
    )
  }
}

export default Noted