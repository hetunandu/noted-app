import * as types from './types';
import {CALL_API} from '../lib/api';


export function fetchRevisionConcepts(subject_key) {
    return {
        [CALL_API]: {
            endpoint: `subjects/${subject_key}/revise`,
            authenticated: true,
            types: [
                types.CONCEPT_LIST_REQUEST,
                types.CONCEPT_LIST_SUCCESS,
                types.CONCEPT_LIST_FAILURE
            ]
        }
    }
}

export function fetchTestConcepts(subject_key) {
    return {
        [CALL_API]: {
            endpoint: `subjects/${subject_key}/test`,
            authenticated: true,
            types: [
                types.CONCEPT_LIST_REQUEST,
                types.CONCEPT_LIST_SUCCESS,
                types.CONCEPT_LIST_FAILURE
            ]
        }
    }
}

// Set the mode
export function setMode(mode){
    return {
        type: types.SET_MODE,
        mode     
    }
}

// Skip the current concept
export function conceptSkip(){
    return{
        type: types.CONCEPT_SKIP
    }
}

// Mark the current concept as Done
export function conceptDone(concept_key){
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

// Mark the current concept as Right
export function conceptRight(concept_key){
    return{
        [CALL_API]: {
            endpoint: `concepts/${concept_key}/right`,
            authenticated: true,
            types: [
                types.CONCEPT_RIGHT_REQUEST,
                types.CONCEPT_RIGHT_SUCCESS,
                types.CONCEPT_RIGHT_FAILURE
            ]
        }
    }
}

// Mark the current concept as Wrong
export function conceptWrong(concept_key){
    return{
        [CALL_API]: {
            endpoint: `concepts/${concept_key}/wrong`,
            authenticated: true,
            types: [
                types.CONCEPT_WRONG_REQUEST,
                types.CONCEPT_WRONG_SUCCESS,
                types.CONCEPT_WRONG_FAILURE
            ]
        }
    }
}
