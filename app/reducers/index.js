import {combineReducers} from 'redux';
import * as authReducer from './auth';
import * as subjectReducer from './subjects';
import * as chapterReducer from './chapters';
import * as conceptReducer from './concepts';

export default combineReducers(Object.assign(
    authReducer,
    subjectReducer,
    chapterReducer,
    conceptReducer
));