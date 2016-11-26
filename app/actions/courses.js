import * as types from './types';
import {CALL_API}from '../lib/api';


export function submitCourse(college) {
    return {
        [CALL_API]: {
            // Hard coding course. When more courses come, we will make it dynamic
            endpoint: `courses/agtzfm5vdGVkLWFwaXITCxIGQ291cnNlGICAgIDAtZsKDA/subscribe`,
            authenticated: true,
            method: 'POST',
            body: {college},
            types: [
                types.COURSE_SUBSCRIBE_REQUEST,
                types.COURSE_SUBSCRIBE_SUCCESS,
                types.COURSE_SUBSCRIBE_FAILURE
            ]
        }
    }
}
