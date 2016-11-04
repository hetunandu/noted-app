import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const subjects = createReducer({
    isFetching: false,
    errorMessage: '', 
    data: []   
}, {
    [types.SUBJECT_LIST_REQUEST](state, action){
        return Object.assign({}, state, {
            isFetching: true,
            errorMessage: ''
        })
    },
    [types.SUBJECT_LIST_SUCCESS](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            data: action.subjects
        })
    },
    [types.SUBJECT_LIST_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    }   
});