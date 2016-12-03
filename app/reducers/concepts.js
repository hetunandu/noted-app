import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const conceptReader = createReducer({
    isFetching: false,
    errorMessage: '',
    mode: false,
    currentIndex: 0,
    list: [],
}, {
    [types.CONCEPT_LIST_REQUEST](state, action){
        return Object.assign({}, state, {
            isFetching: true,
            errorMessage: '',
            result: {},
            list: []
        })
    },
    [types.CONCEPT_LIST_SUCCESS](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            currentIndex: 0,
            list: action.data.concepts
        })
    },
    [types.CONCEPT_LIST_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    },
    [types.SET_MODE](state, action){
        return Object.assign({}, state, {
            mode: action.mode
        })
    },
    [types.CONCEPT_SKIP](state, action){
        return Object.assign({}, state, {
            currentIndex: state.currentIndex + 1
        })
    },
    [types.CONCEPT_DONE_REQUEST](state, action){
        return Object.assign({}, state, {
            isFetching: true,
            errorMessage: ''
        })
    },
    [types.CONCEPT_DONE_SUCCESS](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            currentIndex: state.currentIndex + 1
        })
    },
    [types.CONCEPT_DONE_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    },
    [types.CONCEPT_RIGHT_REQUEST](state, action){
        return Object.assign({}, state, {
            isFetching: true,
            errorMessage: ''
        })
    },
    [types.CONCEPT_RIGHT_SUCCESS](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            currentIndex: state.currentIndex + 1
        })
    },
    [types.CONCEPT_RIGHT_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    },
    [types.CONCEPT_WRONG_REQUEST](state, action){
        return Object.assign({}, state, {
            isFetching: true,
            errorMessage: ''
        })
    },
    [types.CONCEPT_WRONG_SUCCESS](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            currentIndex: state.currentIndex + 1
        })
    },
    [types.CONCEPT_WRONG_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    }
});


export const result = createReducer({
    skip: 0,
    done: 0,
    right: 0,
    wrong: 0
}, {
    [types.CONCEPT_LIST_SUCCESS](state, action){
        return {
            skip: 0,
            done: 0,
            right: 0,
            wrong: 0
        }
    },
    [types.CONCEPT_SKIP](state, action){
        return Object.assign({}, state, {
            skip: state.skip + 1,
        })
    },
    [types.CONCEPT_DONE_SUCCESS](state, action){
        return Object.assign({}, state, {
            done: state.done + 1
        })
    },
    [types.CONCEPT_RIGHT_SUCCESS](state, action){
        return Object.assign({}, state, {
            right: state.right + 1
        })
    },
    [types.CONCEPT_WRONG_SUCCESS](state, action){
        return Object.assign({}, state, {
            wrong: state.wrong + 1
        })
    }
});