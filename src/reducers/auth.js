import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const user = createReducer({
	isFetching: false,
	errorMessage: '',
	isAuthenticated: false,
	token: false
}, {
	[types.LOGIN_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[types.LOGIN_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			isAuthenticated: true,
			data: action.user
		})
	},
	[types.LOGIN_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			isAuthenticated: false,
			token: false,
			errorMessage: action.error
		})
	},
	[types.CONCEPT_READ_SUCCESS](state, action){
		return Object.assign({}, state, {
			data: Object.assign({}, state.data, {
				points: state.data.points + 1
			}) 
		})
	},
	[types.TOKEN_FOUND](state, action){
		return Object.assign({}, state, {
			token: true
		})
	}
});