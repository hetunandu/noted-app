import createReducer from '../../lib/createReducer'
import {
	CONCEPT_LIST_REQUEST,
	CONCEPT_LIST_SUCCESS,
	CONCEPT_LIST_FAILURE
} from '../actionTypes';

const initialState = {
	isFetching: false,
	errorMessage: '',
	mode: null,
	list: []
}

export const concepts = createReducer(initialState, {
	[CONCEPT_LIST_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[CONCEPT_LIST_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			list: action.data.concepts,
			mode: action.info.mode
		})
	},
	[CONCEPT_LIST_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	}
});