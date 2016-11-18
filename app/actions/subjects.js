import * as types from './types';
import {CALL_API}from '../lib/api';


export function fetchSubjectList() {
    return {
        [CALL_API]: {
            endpoint: 'subjects/',
            authenticated: true,
            types: [types.SUBJECT_LIST_REQUEST, types.SUBJECT_LIST_SUCCESS, types.SUBJECT_LIST_FAILURE]
        }
    }
}
