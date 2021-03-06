import createReducer from '../../lib/createReducer'
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	SUBMIT_RESULT_SUCCESS,
	SUBJECT_SKIP_SUCCESS,
	REDEEM_CODE_SUCCESS
} from '../actionTypes';

const initialState = {
	isFetching: false,
	errorMessage: '',
	isAuthenticated: false,
	data: {}
}

export const user = createReducer(initialState, {
	[LOGIN_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[LOGIN_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			isAuthenticated: true,
			data: action.user
		})
	},
	[LOGIN_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			isAuthenticated: false,
			errorMessage: action.error
		})
	}
});