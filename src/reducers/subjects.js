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
            data: action.data.subjects
        })
    },
    [types.SUBJECT_LIST_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    }   
});

export const activeSubject = createReducer({
    isFetching: false,
    errorMessage: '',
    plan: false,
    hasAccess: false
}, {
    [types.SUBJECT_DETAIL_REQUEST](state, action){
        return Object.assign({}, state, {
            isFetching: true,
            errorMessage: ''
        })
    },
    [types.SUBJECT_DETAIL_SUCCESS](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            plan: action.data.plan,
            hasAccess: action.data.hasChapterAccess
        })
    },
    [types.SUBJECT_DETAIL_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    }

})