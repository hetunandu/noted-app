import {
    PAYMENT_REQUEST_REQUEST,
    PAYMENT_REQUEST_SUCCESS,
    PAYMENT_REQUEST_FAILURE,

    PAYMENT_STATUS_REQUEST,
    PAYMENT_STATUS_SUCCESS,
    PAYMENT_STATUS_FAILURE,

    USER_POINTS_REQUEST,
    USER_POINTS_SUCCESS,
    USER_POINTS_FAILURE

} from '../actionTypes';
import {CALL_API}from '../../lib/api';


export function requestPayment() {
    return {
        [CALL_API]: {
            endpoint: 'payments/request',
            authenticated: true,
            types: [
                PAYMENT_REQUEST_REQUEST,
                PAYMENT_REQUEST_SUCCESS,
                PAYMENT_REQUEST_FAILURE
            ]
        }
    }
}

export function paymentStatus(payment_key) {
    return {
        [CALL_API]: {
            endpoint: `payments/status/${payment_key}`,
            authenticated: true,
            types: [
                PAYMENT_STATUS_REQUEST,
                PAYMENT_STATUS_SUCCESS,
                PAYMENT_STATUS_FAILURE
            ]
        }
    }
}

export function getNewPoints(){
    return {
        [CALL_API]: {
            endpoint: 'user/points',
            authenticated: true,
            types: [
                USER_POINTS_REQUEST,
                USER_POINTS_SUCCESS,
                USER_POINTS_FAILURE
            ]
        }
    }
}