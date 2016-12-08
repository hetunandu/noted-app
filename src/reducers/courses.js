import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const courses = createReducer({
    isFetching: false,
    errorMessage: '', 
    subscribed: false
}, {
    [types.COURSE_SUBSCRIBE_REQUEST](state, action){
        return Object.assign({}, state, {
            isFetching: true,
            errorMessage: ''
        })
    },
    [types.COURSE_SUBSCRIBE_SUCCESS](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            subscribed: true
        })
    },
    [types.COURSE_SUBSCRIBE_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    }   
});