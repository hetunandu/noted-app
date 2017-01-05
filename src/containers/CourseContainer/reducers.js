import createReducer from '../../lib/createReducer'
import {
	COURSE_SUBSCRIBE_REQUEST,
	COURSE_SUBSCRIBE_SUCCESS,
	COURSE_SUBSCRIBE_FAILURE
} from '../actionTypes';

const initialState = {
	isFetching: false,
	errorMessage: '',
	subscribed: false,
}

export const course = createReducer(initialState, {
	[COURSE_SUBSCRIBE_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[COURSE_SUBSCRIBE_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			subscribed: true
		})
	},
	[COURSE_SUBSCRIBE_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			subscribed: false
		})
	}
});