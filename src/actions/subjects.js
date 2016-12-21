import * as types from './types';
import {CALL_API}from '../lib/api';


export function fetchSubjectList() {
	return {
		[CALL_API]: {
			endpoint: 'subjects',
			authenticated: true,
			types: [
			types.SUBJECT_LIST_REQUEST,
			types.SUBJECT_LIST_SUCCESS,
			types.SUBJECT_LIST_FAILURE
			]
		}
	}
}

export function fetchSubjectDetail(subject_key){
	return {
		[CALL_API]: {
			endpoint: `subjects/${subject_key}`,
			authenticated: true,
			types: [
				types.SUBJECT_DETAIL_REQUEST,
				types.SUBJECT_DETAIL_SUCCESS,
				types.SUBJECT_DETAIL_FAILURE
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
				types.SUBJECT_INDEX_REQUEST,
				types.SUBJECT_INDEX_SUCCESS,
				types.SUBJECT_INDEX_FAILURE,
			]
		}
	}
}