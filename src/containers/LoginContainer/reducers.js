import createReducer from '../../lib/createReducer'
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE
} from './types';

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
	// [types.SUBMIT_RESULT_SUCCESS](state, action){
	// 	return Object.assign({}, state, {
	// 		data: Object.assign({}, state, {
	// 			points: action.data.new_points + state.data.points
	// 		})
	// 	})
	// },
	// [types.REDEEM_CODE_SUCCESS](state, action){
	// 	return Object.assign({}, state, {
	// 		data: Object.assign({}, state, {
	// 			points: action.data.new_points + state.data.points
	// 		})
	// 	})
	// },
	// [types.SUBJECT_SKIP_SUCCESS](state, action){
	// 	return Object.assign({}, state, {
	// 		data: Object.assign({}, state.data, {
	// 			points: state.data.points - 25
	// 		})
	// 	})
	// },
	// [types.OFFLINE_INDEX_SUCCESS](state, action){
	// 	return Object.assign({}, state, {
	// 		data: Object.assign({}, state.data, {
	// 			points: state.data.points - 500
	// 		})
	// 	})
	// },
	// [types.TOKEN_FOUND](state, action){
	// 	return Object.assign({}, state, {
	// 		token: true
	// 	})
	// }
});