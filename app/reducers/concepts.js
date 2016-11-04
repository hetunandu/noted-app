import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const concepts = createReducer({
    isFetching: false,
    errorMessage: '', 
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
            data: action.concepts
        })
    },
    [types.CONCEPT_LIST_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    },
    [types.CONCEPT_ACTION](state, action){
        return Object.assign({}, state, {
            data: state.data.filter( (concept) => {
                return concept.key != action.concept_key
            })
        })
    }
});