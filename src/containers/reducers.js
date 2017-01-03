import {combineReducers} from 'redux';
import * as user from './LoginContainer/reducers';
import * as subjects from './SubjectsContainer/reducers';
import * as concepts from './ConceptsContainer/reducers';
import * as index from './IndexContainer/reducers';
//import subjectReducer from './Subjects';
//import conceptReducer from './Concepts';
//import codeReducer from './Codes';
//import offlineReducer from './Offline';

export default combineReducers(Object.assign(
	user,
	subjects,
	concepts,
	index
//	subjectReducer,
//	conceptReducer,
//	codeReducer,
//	offlineReducer
));