import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const offline = createReducer({
	isFetching: false,
	errorMessage: '', 
	saved: false,
	index: {}
}, {
	[types.OFFLINE_INDEX_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[types.OFFLINE_INDEX_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			saved: true
		})
	},
	[types.OFFLINE_INDEX_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	}
});