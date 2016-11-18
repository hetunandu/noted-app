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


export function markConceptAction(concept_action, concept_key){
    return{
        type: types.CONCEPT_ACTION,
        concept_action,
        concept_key
    }
}