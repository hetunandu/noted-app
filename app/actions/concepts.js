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


export function markConceptDone(concept_key){
    return{
        [CALL_API]: {
            endpoint: `concepts/${concept_key}/done`,
            authenticated: true,
            types: [
                types.CONCEPT_DONE_REQUEST,
                types.CONCEPT_DONE_SUCCESS,
                types.CONCEPT_DONE_FAILURE
            ]
        }
    }
}

export function skipCurrentConcept(){
    return{
        type: types.CONCEPT_SKIP
    }
}