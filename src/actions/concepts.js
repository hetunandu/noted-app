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

export function fetchSingleConcept(concept_key){
	return {
		[CALL_API]: {
			endpoint: `concepts/${concept_key}`,
			authenticated: true,
			types: [
				types.CONCEPT_VIEW_REQUEST,
				types.CONCEPT_VIEW_SUCCESS,
				types.CONCEPT_VIEW_FAILURE
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


export function toggleReferences(){
	return {
		type: types.TOGGLE_REFERENCES
	}
}

export function readingConcept(reading){
	return {
		type: types.READ_CONCEPT,
		reading
	}
}

export function showAnswer(showAns){
	return {
		type: types.SHOW_ANSWER,
		showAns
	}
}

// Skip the current concept
export function conceptSkip(key){

	return {
		type: types.MARK_CONCEPT,
		key,
		marked: 'skip'
	}
}

// Mark the current concept as Done
export function conceptRead(key){
	return{
		type: types.MARK_CONCEPT,
		key,
		marked: 'read'
	}
}

// Mark the current concept as Right
export function conceptRight(key){
	return{
		type: types.MARK_CONCEPT,
		key,
		marked: 'right'
	}
}

// Mark the current concept as Wrong
export function conceptWrong(key){
	return{
		type: types.MARK_CONCEPT,
		key,
		marked: 'wrong'
	}
}

export function submitResult(subject_key, mode, result){
	return {
		[CALL_API]: {
			endpoint: `subjects/${subject_key}/${mode}/result`,
			method:"POST",
			body: result,
			authenticated: true,
			types: [
				types.SUBMIT_RESULT_REQUEST,
				types.SUBMIT_RESULT_SUCCESS,
				types.SUBMIT_RESULT_FAILURE
			]
		}
	}
}






