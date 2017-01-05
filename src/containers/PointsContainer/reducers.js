import createReducer from '../../lib/createReducer'
import {
	REDEEM_CODE_REQUEST,
	REDEEM_CODE_SUCCESS,
	REDEEM_CODE_FAILURE,
	LOGIN_SUCCESS,
	COOLDOWN_SKIP_SUCCESS,
	SUBMIT_RESULT_SUCCESS
} from '../actionTypes'

const initialState = {
	isFetching: false,
	errorMessage: '', 
	balance: 0
}

export const points = createReducer(initialState, {
	[LOGIN_SUCCESS](state, action){
		return Object.assign({}, state, {
			balance: action.user.points
		})
	},
	[REDEEM_CODE_REQUEST](state, action){
		return Object.assign({}, state, {
			isFetching: true,
			errorMessage: ''
		})
	},
	[REDEEM_CODE_SUCCESS](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			balance: state.balance + action.data.new_points
		})
	},
	[REDEEM_CODE_FAILURE](state, action){
		return Object.assign({}, state, {
			isFetching: false,
			errorMessage: action.error
		})
	},
	[SUBMIT_RESULT_SUCCESS](state, action){
		return Object.assign({}, state, {
			balance: action.data.new_points + state.balance
		})
	},
	[COOLDOWN_SKIP_SUCCESS](state, action){
		return Object.assign({}, state, {
			balance: state.balance - action.info.cost
		})
	}
});