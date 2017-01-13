import createReducer from '../../lib/createReducer'
import {
    PAYMENT_REQUEST_REQUEST,
    PAYMENT_REQUEST_SUCCESS,
    PAYMENT_REQUEST_FAILURE,

    PAYMENT_STATUS_SUCCESS,

    USER_POINTS_SUCCESS
} from '../actionTypes'

const initialState = {
    isFetching: false,
    errorMessage: '',
    request: {},
    key: '',
    status: ''
};

export const payment = createReducer(initialState, {
    [PAYMENT_REQUEST_REQUEST](state, action){
        return Object.assign({}, state, {
            isFetching: true,
            errorMessage: '',
            request: {},
            key: '',
            status: ''
        })
    },
    [PAYMENT_REQUEST_SUCCESS](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            request: action.data.payment_request,
            key: action.data.payment_key
        })
    },
    [PAYMENT_REQUEST_FAILURE](state, action){
        return Object.assign({}, state, {
            isFetching: false,
            errorMessage: action.error
        })
    },
    [PAYMENT_STATUS_SUCCESS](state, action){
        return Object.assign({}, state, {
            status: action.data.status
        })
    },
    [USER_POINTS_SUCCESS](state, action){
        return initialState
    }
});
