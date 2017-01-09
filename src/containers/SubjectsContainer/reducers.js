import createReducer from '../../lib/createReducer'
import {
	SUBJECT_LIST_REQUEST,
	SUBJECT_LIST_SUCCESS,
	SUBJECT_LIST_FAILURE,

	COOLDOWN_SKIP_REQUEST,
	COOLDOWN_SKIP_SUCCESS,
	COOLDOWN_SKIP_FAILURE,

	SUBJECT_OFFLINE_REQUEST,
	SUBJECT_OFFLINE_SUCCESS,
	SUBJECT_OFFLINE_FAILURE,

	FOUND_OFFLINE_SUBJECT,

	CONCEPT_LIST_SUCCESS,
	CONCEPT_VIEW_SUCCESS,

} from '../actionTypes';

const initialState = {
	isFetching: false,
	errorMessage: '',
	list: []
}

export const subjects = createReducer(initialState, {
	[SUBJECT_LIST_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[SUBJECT_LIST_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			list: action.data.subjects
		})
	},
	[SUBJECT_LIST_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	},
	[CONCEPT_LIST_SUCCESS](state, action){
		return Object.assign({}, state, {
			list: state.list.map(subject => {
				if(subject.key == action.info.subject_key){
					return Object.assign({}, subject, {
						views_available: action.data.views_available
					})
				}else{
					return subject
				}
			})
		})
	},
	[CONCEPT_VIEW_SUCCESS](state, action){
		return Object.assign({}, state, {
			list: state.list.map(subject => {
				if(subject.key == action.info.subject_key){
					return Object.assign({}, subject, {
						views_available: action.data.views_available
					})
				}else{
					return subject
				}
			})
		})
	},
	[COOLDOWN_SKIP_SUCCESS](state, action){
		return Object.assign({}, state, {
			list: state.list.map(subject => {
				if (subject.key == action.info.subject_key){
					return Object.assign({}, subject, {
						views_available: 10
					})
				}else{
					return subject
				}
			})
		})
	},
	[SUBJECT_OFFLINE_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true
		})
	},
	[SUBJECT_OFFLINE_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			list: state.list.map(subject => {
				if(subject.key == action.subject_key){
					return Object.assign({}, subject, {
						offline: true
					})
				}else{
					return subject
				}
			})
		})
	},
	[FOUND_OFFLINE_SUBJECT](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			list: state.list.map(subject => {
				if(subject.key == action.subject_key){
					return Object.assign({}, subject, {
						offline: true
					})
				}else{
					return subject
				}
			})
		})
	},
	[SUBJECT_OFFLINE_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	}
});
