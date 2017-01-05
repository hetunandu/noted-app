import {
	COURSE_SUBSCRIBE_REQUEST,
	COURSE_SUBSCRIBE_SUCCESS,
	COURSE_SUBSCRIBE_FAILURE
} from '../actionTypes';
import {CALL_API} from '../../lib/api';

export function submitCourse(college) {

	return {
		[CALL_API]: {
			endpoint: `courses/agtzfm5vdGVkLWFwaXITCxIGQ291cnNlGICAgIDAtZsKDA/subscribe`,
			authenticated: true,
			method: 'POST',
			body: college,
			types: [
				COURSE_SUBSCRIBE_REQUEST,
				COURSE_SUBSCRIBE_SUCCESS,
				COURSE_SUBSCRIBE_FAILURE
			]
		}
	}
}
