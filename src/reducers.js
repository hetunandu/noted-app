import {combineReducers} from 'redux';
import *  as authReducer from './containers/LoginContainer/reducers';
//import subjectReducer from './Subjects';
//import conceptReducer from './Concepts';
//import codeReducer from './Codes';
//import offlineReducer from './Offline';

export default combineReducers(Object.assign(
	authReducer,
//	subjectReducer,
//	conceptReducer,
//	codeReducer,
//	offlineReducer
));