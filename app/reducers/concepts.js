import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const concepts = createReducer({
    isFetching: false,
    isUnderstanding: false,
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
            currentConcept: 0,
            data: action.data.concepts
        })
    },
    [types.CONCEPT_LIST_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    },
    [types.CONCEPT_UNDERSTOOD_REQUEST](state, action){
        return Object.assign({}, state, {
            isUnderstanding: true,
            errorMessage: ''
        })
    },
    [types.CONCEPT_UNDERSTOOD_SUCCESS](state, action){
        return Object.assign({}, state, {
            isUnderstanding: false,
            currentConcept: state.currentConcept + 1
        })
    },
    [types.CONCEPT_UNDERSTOOD_FAILURE](state, action){
        return Object.assign({}, state, {
            isUnderstanding: false,
            errorMessage: action.error
        })
    }
});