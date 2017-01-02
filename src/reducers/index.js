import {combineReducers} from 'redux';
import * as authReducer from './auth';
import * as courseReducer from './courses';
import * as subjectReducer from './subjects';
import * as conceptReducer from './concepts';
import * as codeReducer from './codes';
import * as offlineReducer from './offline';

export default combineReducers(Object.assign(
	authReducer,
	courseReducer,
	subjectReducer,
	conceptReducer,
	codeReducer,
	offlineReducer
));