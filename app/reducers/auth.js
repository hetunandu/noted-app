import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const user = createReducer({
    isFetching: false,
    errorMessage: '',    
    isAuthenticated: false,
}, {
    [types.SET_AUTH](state, action){
        return Object.assign({}, state, {
            isAuthenticated: action.isAuthenticated
        })
    },
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
            errorMessage: action.error
        })
    }
});