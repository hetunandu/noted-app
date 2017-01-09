import {CALL_API} from '../../lib/api';
import {
	CONCEPT_VIEW_REQUEST,
	CONCEPT_VIEW_SUCCESS,
	CONCEPT_VIEW_FAILURE
} from '../actionTypes';


export function readSingleConcept(subject_key, concept_key){
	return {
		[CALL_API]: {
			endpoint: `concepts/${concept_key}`,
			authenticated: true,
			info: {subject_key},
			types: [
				CONCEPT_VIEW_REQUEST,
				CONCEPT_VIEW_SUCCESS,
				CONCEPT_VIEW_FAILURE
			]
		}
	}
}
