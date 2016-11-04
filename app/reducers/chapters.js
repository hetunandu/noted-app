import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const chapters = createReducer({
    isFetching: false,
    errorMessage: '', 
    data: []   
}, {
    [types.CHAPTER_LIST_REQUEST](state, action){
        return Object.assign({}, state, {
            isFetching: true,
            errorMessage: '',
            data: []
        })
    },
    [types.CHAPTER_LIST_SUCCESS](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            data: action.chapters
        })
    },
    [types.CHAPTER_LIST_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    }   
});