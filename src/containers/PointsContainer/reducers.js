import createReducer from '../../lib/createReducer'
import {
	REDEEM_CODE_REQUEST,
	REDEEM_CODE_SUCCESS,
	REDEEM_CODE_FAILURE
} from '../actionTypes'

const initialState = {
	isFetching: false,
	errorMessage: '', 
	points: false
}

export const codes = createReducer(initialState, {
	[REDEEM_CODE_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[REDEEM_CODE_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			points: action.points
		})
	},
	[REDEEM_CODE_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	}
});