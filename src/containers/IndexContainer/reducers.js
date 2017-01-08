import createReducer from '../../lib/createReducer'
import {
	SUBJECT_INDEX_REQUEST,
	SUBJECT_INDEX_SUCCESS,
	SUBJECT_INDEX_FAILURE,
	INDEX_OFFLINE_REQUEST,
	INDEX_OFFLINE_SUCCESS,
	INDEX_OFFLINE_FAILURE
} from '../actionTypes';

const initialState = {
	isFetching: false,
	errorMessage: '',
	offline: false,
	chapters: []
}

export const index = createReducer(initialState, {
	[SUBJECT_INDEX_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[SUBJECT_INDEX_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			chapters: action.data.index
		})
	},
	[SUBJECT_INDEX_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	},
	[INDEX_OFFLINE_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			chapters: []
		})
	},
	[INDEX_OFFLINE_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			offline: true,
			chapters: action.index.index
		})
	},
	[INDEX_OFFLINE_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			offline: false,
			errorMessage: action.error
		})
	}
});