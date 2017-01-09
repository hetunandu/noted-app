import {
	CONCEPT_LIST_REQUEST,
	CONCEPT_LIST_SUCCESS,
	CONCEPT_LIST_FAILURE,
	CONCEPT_VIEW_REQUEST,
	CONCEPT_VIEW_SUCCESS,
	CONCEPT_VIEW_FAILURE,
	SET_MODE,
	TOGGLE_REFERENCES,
	READ_CONCEPT,
	SHOW_ANSWER,
	MARK_CONCEPT,
	SUBMIT_RESULT_REQUEST,
	SUBMIT_RESULT_SUCCESS,
	SUBMIT_RESULT_FAILURE,
	CONCEPT_IMP_REQUEST,
	CONCEPT_IMP_SUCCESS,
	CONCEPT_IMP_FAILURE
} from '../actionTypes';
import {CALL_API} from '../../lib/api';

export function fetchRevisionConcepts(subject_key) {
	return {
		[CALL_API]: {
			endpoint: `subjects/${subject_key}/revise`,
			authenticated: true,
			types: [
				CONCEPT_LIST_REQUEST,
				CONCEPT_LIST_SUCCESS,
				CONCEPT_LIST_FAILURE
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
				CONCEPT_LIST_REQUEST,
				CONCEPT_LIST_SUCCESS,
				CONCEPT_LIST_FAILURE
			]
		}
	}
}


// Set the mode
export function setMode(mode){
	return {
		type: SET_MODE,
		mode
	}
}


export function toggleReferences(){
	return {
		type: TOGGLE_REFERENCES
	}
}

export function readingConcept(reading){
	return {
		type: READ_CONCEPT,
		reading
	}
}

export function showAnswer(showAns){
	return {
		type: SHOW_ANSWER,
		showAns
	}
}

// Skip the current concept
export function conceptSkip(key){

	return {
		type: MARK_CONCEPT,
		key,
		marked: 'skip'
	}
}

// Mark the current concept as Done
export function conceptRead(key){
	return{
		type: MARK_CONCEPT,
		key,
		marked: 'read'
	}
}

// Mark the current concept as Right
export function conceptRight(key){
	return{
		type: MARK_CONCEPT,
		key,
		marked: 'right'
	}
}

// Mark the current concept as Wrong
export function conceptWrong(key){
	return{
		type: MARK_CONCEPT,
		key,
		marked: 'wrong'
	}
}

export function markConceptImportant(concept_key){
	return {
		[CALL_API]: {
			info: {concept_key},
			endpoint: `concepts/${concept_key}/important`,
			authenticated: true,
			types: [
				CONCEPT_IMP_REQUEST,
				CONCEPT_IMP_SUCCESS,
				CONCEPT_IMP_FAILURE
			]
		}
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
				SUBMIT_RESULT_REQUEST,
				SUBMIT_RESULT_SUCCESS,
				SUBMIT_RESULT_FAILURE
			]
		}
	}
}
