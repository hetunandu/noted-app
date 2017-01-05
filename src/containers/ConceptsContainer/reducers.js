import createReducer from '../../lib/createReducer'
import {
	CONCEPT_LIST_REQUEST,
	CONCEPT_LIST_SUCCESS,
	CONCEPT_LIST_FAILURE,
	CONCEPT_VIEW_REQUEST,
	CONCEPT_VIEW_SUCCESS,
	CONCEPT_VIEW_FAILURE,
	TOGGLE_REFERENCES,
	READ_CONCEPT,
	MARK_CONCEPT,
	SHOW_ANSWER
} from '../actionTypes';

const initialState = {
	isFetching: false,
	errorMessage: '',
	reference: false,
	isReading: false,
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
			list: action.data.concepts
		})
	},
	[CONCEPT_LIST_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	},
	[CONCEPT_VIEW_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: '',
			list: [],
			result: []
		})
	},
	[CONCEPT_VIEW_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			list: [action.data.concept]
		})
	},
	[CONCEPT_VIEW_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	},
	[TOGGLE_REFERENCES](state, action){
		return Object.assign({}, state, {
			reference: !state.reference
		})
	},
	[READ_CONCEPT](state, action){
		return Object.assign({}, state, {
			isReading: action.reading
		})
	},
	[MARK_CONCEPT](state, action){
		return Object.assign({}, state, {
			list: state.list.filter((concept) => {
				if (concept.key == action.key){
					return false
				}else{
					return true
				}
			})
		})
	},
	[SHOW_ANSWER](state, action){
		return Object.assign({}, state, {
			showAns: action.showAns
		})
	}
});