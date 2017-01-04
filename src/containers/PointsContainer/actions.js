import {
	REDEEM_CODE_REQUEST,
	REDEEM_CODE_SUCCESS,
	REDEEM_CODE_FAILURE
} from '../actionTypes';
import {CALL_API}from '../../lib/api';


export function redeemCode(code) {
	return {
		[CALL_API]: {
			endpoint: 'users/code/redeem',
			authenticated: true,
			method:"POST",
			body: code,
			types: [
				REDEEM_CODE_REQUEST,
				REDEEM_CODE_SUCCESS,
				REDEEM_CODE_FAILURE
			]
		}
	}
}
