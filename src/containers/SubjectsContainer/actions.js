import {CALL_API, callApi}from '../../lib/api';
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

	SUBJECT_OFFLINE_REQUEST,
	SUBJECT_OFFLINE_SUCCESS,
	SUBJECT_OFFLINE_FAILURE,

	FOUND_OFFLINE_SUBJECT,

	READ_OFFLINE_SUBJECT

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

export function subjectCooldownSkip(subject_key, cost){
	return {
		[CALL_API]: {
			info: {subject_key, cost},
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
			info: {subject_key},
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
			info: {subject_key},
			types: [
				CONCEPT_LIST_REQUEST,
				CONCEPT_LIST_SUCCESS,
				CONCEPT_LIST_FAILURE
			]
		}
	}
}


export function downloadSubjectOffline(subject_key){

	return dispatch => {
		dispatch(offlineRequest())

		callApi(`subjects/${subject_key}/offline`, true)
			.then(json => {
				if(json.success === true){
					storage.save({
						key: 'subject',
						id: json.message.subject_key,
						rawData: {...json.message},
						expires: null
					})
					dispatch(offlineSuccess(json.message.subject_key))

				}else{
					dispatch(offlineFailure(json.error))
				}
			})

	}
}


function offlineRequest(){
	return {
		type: SUBJECT_OFFLINE_REQUEST
	}
}

function offlineSuccess(subject_key){
	return {
		type: SUBJECT_OFFLINE_SUCCESS,
		subject_key
	}

}

function offlineFailure(error){
	return {
		type: SUBJECT_OFFLINE_FAILURE,
		error
	}
}


export function foundOfflineSubject(subject_key){
	return {
		type: FOUND_OFFLINE_SUBJECT,
		subject_key
	}
}

export function loadOfflineSubject(subject){
	return {
		type: READ_OFFLINE_SUBJECT,
		subject
	}
}
