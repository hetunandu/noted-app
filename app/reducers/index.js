import {combineReducers} from 'redux';
import routes from './router';
import * as authReducer from './auth';
import * as subjectReducer from './subjects';
import * as chapterReducer from './chapters';
import * as conceptReducer from './concepts';

export default combineReducers(Object.assign(
    routes,
    authReducer,
    subjectReducer,
    chapterReducer,
    conceptReducer
));