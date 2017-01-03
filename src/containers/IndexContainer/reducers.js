import createReducer from '../../lib/createReducer'
import {
	SUBJECT_INDEX_REQUEST,
	SUBJECT_INDEX_SUCCESS,
	SUBJECT_INDEX_FAILURE,
} from '../actionTypes';

const initialState = {
	isFetching: false,
	errorMessage: '',
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
	}
});