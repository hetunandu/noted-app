import {CALL_API}from '../../lib/api';
import {
	SUBJECT_LIST_REQUEST,
	SUBJECT_LIST_SUCCESS,
	SUBJECT_LIST_FAILURE,
	
	SUBJECT_INDEX_REQUEST,
	SUBJECT_INDEX_SUCCESS,
	SUBJECT_INDEX_FAILURE,
	
	COOLDOWN_SKIP_REQUEST,
	COOLDOWN_SKIP_SUCCESS,
	COOLDOWN_SKIP_FAILURE,
	
	CONCEPT_LIST_REQUEST,
	CONCEPT_LIST_SUCCESS,
	CONCEPT_LIST_FAILURE,

} from '../actionTypes';


export function fetchSubjectList() {
	return {
		[CALL_API]: {
			endpoint: 'subjects',
			authenticated: true,
			types: [
				SUBJECT_LIST_REQUEST,
				SUBJECT_LIST_SUCCESS,
				SUBJECT_LIST_FAILURE
			]
		}
	}
}


export function fetchSubjectIndex(subject_key){
	return {
		[CALL_API]: {
			endpoint: `subjects/${subject_key}/index`,
			authenticated: true,
			types: [
				SUBJECT_INDEX_REQUEST,
				SUBJECT_INDEX_SUCCESS,
				SUBJECT_INDEX_FAILURE,
			]
		}
	}
}

export function subjectCooldownSkip(subject_key){
	return {
		[CALL_API]: {
			info: {subject_key},
			endpoint: `subjects/${subject_key}/reset`,
			authenticated: true,
			types: [
				COOLDOWN_SKIP_REQUEST,
				COOLDOWN_SKIP_SUCCESS,
				COOLDOWN_SKIP_FAILURE
			]
		}
	}
}

export function fetchRevisionConcepts(subject_key) {
	return {
		[CALL_API]: {
			endpoint: `subjects/${subject_key}/revise`,
			authenticated: true,
			types: [
				CONCEPT_LIST_REQUEST,
				CONCEPT_LIST_SUCCESS,
				CONCEPT_LIST_FAILURE
			],
			info: {mode: 'revise'}
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
			],
			info: {mode: 'test'}
		}
	}
}

export function fetchSingleConcept(concept_key){
	return {
		[CALL_API]: {
			endpoint: `concepts/${concept_key}`,
			authenticated: true,
			types: [
				CONCEPT_VIEW_REQUEST,
				CONCEPT_VIEW_SUCCESS,
				CONCEPT_VIEW_FAILURE
			],
			info: {mode: 'revise'}
		}
	}
}