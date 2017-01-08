import {combineReducers} from 'redux';
import * as user from './LoginContainer/reducers';
import * as course from './CourseContainer/reducers';
import * as subjects from './SubjectsContainer/reducers';
import * as concepts from './ConceptsContainer/reducers';
import * as index from './IndexContainer/reducers';
import * as result from './ResultContainer/reducers';
import * as points from './PointsContainer/reducers';
import * as offline from './OfflineContainer/reducers';

export default combineReducers(Object.assign(
	user,
	course,
	subjects,
	concepts,
	index,
	result,
	points,
	offline
));
