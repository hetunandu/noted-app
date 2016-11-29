import * as types from './types';
import {CALL_API} from '../lib/api';

export function fetchConceptsFromChapter(chapter_key) {
    return {
        [CALL_API]: {
            endpoint: `chapters/${chapter_key}`,
            authenticated: true,
            types: [
                types.CONCEPT_LIST_REQUEST,
                types.CONCEPT_LIST_SUCCESS,
                types.CONCEPT_LIST_FAILURE
            ]
        }
    }
}

export function fetchConceptsList(subject_key) {
    return {
        [CALL_API]: {
            endpoint: `subjects/${subject_key}/concepts`,
            authenticated: true,
            types: [
                types.CONCEPT_LIST_REQUEST,
                types.CONCEPT_LIST_SUCCESS,
                types.CONCEPT_LIST_FAILURE
            ]
        }
    }
}


export function markConceptUnderstood(concept_key){
    return{
        [CALL_API]: {
            endpoint: `concepts/${concept_key}/understood`,
            authenticated: true,
            types: [
                types.CONCEPT_UNDERSTOOD_REQUEST,
                types.CONCEPT_UNDERSTOOD_SUCCESS,
                types.CONCEPT_UNDERSTOOD_FAILURE
            ]
        }
    }
}