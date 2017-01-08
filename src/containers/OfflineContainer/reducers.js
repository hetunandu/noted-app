import createReducer from '../../lib/createReducer'
import {
	READ_OFFLINE_SUBJECT
} from '../actionTypes'

const initialState = {
	index: []
}

export const offline = createReducer(initialState, {
	[READ_OFFLINE_SUBJECT](state, action){
		return Object.assign({}, state, {
			index: action.subject.index
		})
	}
});
