import {combineReducers} from 'redux';
import * as authReducer from './auth';
import * as courseReducer from './courses';
import * as subjectReducer from './subjects';
import * as conceptReducer from './concepts';

export default combineReducers(Object.assign(
    authReducer,
    courseReducer,
    subjectReducer,
    conceptReducer
));