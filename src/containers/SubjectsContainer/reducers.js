import createReducer from '../../lib/createReducer'
import {
	SUBJECT_LIST_REQUEST,
	SUBJECT_LIST_SUCCESS,
	SUBJECT_LIST_FAILURE,

	COOLDOWN_SKIP_REQUEST,
	COOLDOWN_SKIP_SUCCESS,
	COOLDOWN_SKIP_FAILURE
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
	}
});