import * as types from './types';
import {CALL_API} from '../lib/api';


export function fetchChapterList(subject_key) {
    return {
        [CALL_API]: {
            endpoint: `subjects/${subject_key}/chapters`,
            authenticated: true,
            types: [
                types.CHAPTER_LIST_REQUEST,
                types.CHAPTER_LIST_SUCCESS,
                types.CHAPTER_LIST_FAILURE
            ]
        }
    }
}
