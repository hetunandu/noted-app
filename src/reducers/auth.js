import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const user = createReducer({
	isFetching: false,
	errorMessage: '',
	isAuthenticated: false,
	token: false,
	data: {}
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
	[types.SUBMIT_RESULT_SUCCESS](state, action){
		return Object.assign({}, state, {
			data: Object.assign({}, state, {
				points: action.data.new_points + state.data.points
			})
		})
	},
	[types.SUBJECT_SKIP_SUCCESS](state, action){
		return Object.assign({}, state, {
			data: Object.assign({}, state.data, {
				points: state.data.points - 25
			})
		})
	},
	[types.TOKEN_FOUND](state, action){
		return Object.assign({}, state, {
			token: true
		})
	}
});