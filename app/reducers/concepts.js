import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const concepts = createReducer({
    isFetching: false,
    errorMessage: '', 
    currentConcept: 0,
    data: []
}, {
    [types.CONCEPT_LIST_REQUEST](state, action){
        return Object.assign({}, state, {
            isFetching: true,
            errorMessage: '',
            data: []
        })
    },
    [types.CONCEPT_LIST_SUCCESS](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            mode: "exp",
            currentConcept: 0,
            data: action.data.concepts
        })
    },
    [types.CONCEPT_LIST_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            mode: "exp",
            errorMessage: action.error
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
            currentConcept: state.currentConcept + 1
        })
    },
    [types.CONCEPT_DONE_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    },
    [types.CONCEPT_SKIP](state, action){
        return Object.assign({}, state, {
            currentConcept: state.currentConcept + 1
        })
    },
    [types.CONCEPT_QUIZ_REQUEST](state, action){
        return Object.assign({}, state, {
            isFetching: true,
            errorMessage: '',
            data: []
        })
    },
    [types.CONCEPT_QUIZ_SUCCESS](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            currentConcept: 0,
            mode: "quiz",
            data: action.data.questions
        })
    },
    [types.CONCEPT_QUIZ_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            mode: "exp",
            errorMessage: action.error
        })
    },
    [types.CHANGE_CONCEPT_MODE](state, action){
        return Object.assign({}, state, {
            mode: action.mode
        })
    }
});