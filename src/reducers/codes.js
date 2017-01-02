import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const codes = createReducer({
	isFetching: false,
	errorMessage: '', 
	points: false
}, {
	[types.REDEEM_CODE_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[types.REDEEM_CODE_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			points: action.points
		})
	},
	[types.REDEEM_CODE_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	}
});