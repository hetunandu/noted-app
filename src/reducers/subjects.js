import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const subjects = createReducer({
	isFetching: false,
	errorMessage: '', 
	list: []   
}, {
	[types.SUBJECT_LIST_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: '',
			list: []
		})
	},
	[types.SUBJECT_LIST_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			list: action.data.subjects
		})
	},
	[types.SUBJECT_LIST_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	}   
});

export const activeSubject = createReducer({
	isFetching: false,
	errorMessage: '',
}, {
	[types.SUBJECT_DETAIL_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[types.SUBJECT_DETAIL_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			data: action.data.subject,
		})
	},
	[types.SUBJECT_DETAIL_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	}

})

export const index = createReducer({
	isFetching: false,
	errorMessage: '',
	chapters: []
}, {
	[types.SUBJECT_INDEX_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[types.SUBJECT_INDEX_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			chapters: action.data.index
		})
	},
	[types.SUBJECT_INDEX_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	}

})