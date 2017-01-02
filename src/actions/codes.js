import * as types from './types';
import {CALL_API}from '../lib/api';


export function redeemCode(code) {
	return {
		[CALL_API]: {
			endpoint: 'users/code/redeem',
			authenticated: true,
			method:"POST",
			body: code,
			types: [
				types.REDEEM_CODE_REQUEST,
				types.REDEEM_CODE_SUCCESS,
				types.REDEEM_CODE_FAILURE
			]
		}
	}
}
