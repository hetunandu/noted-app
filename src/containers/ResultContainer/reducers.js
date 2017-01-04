import createReducer from '../../lib/createReducer'
import {
	CONCEPT_LIST_SUCCESS,
	CONCEPT_VIEW_SUCCESS,
	MARK_CONCEPT,
	SUBMIT_RESULT_REQUEST,
	SUBMIT_RESULT_SUCCESS,
	SUBMIT_RESULT_FAILURE
} from '../actionTypes';


const initialState = {
	isFetching: false,
	errorMessage: '',
	data: [],
	points: 0
}

export const result = createReducer(initialState, {
	[CONCEPT_LIST_SUCCESS](state, action){
		return Object.assign({}, state, {
			data: [],
			points: 0
		})
	},
	[CONCEPT_VIEW_SUCCESS](state, action){
		return Object.assign({}, state, {
			data: [],
			points: 0
		})
	},
	[MARK_CONCEPT](state, action){
		return Object.assign({}, state, {
			data: state.data.concat([{
				key: action.key,
				marked: action.marked
			}])
		})
	},
	[SUBMIT_RESULT_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[SUBMIT_RESULT_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			points: action.data.new_points
		})
	},
	[SUBMIT_RESULT_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	}
});