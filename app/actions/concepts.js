import * as types from './types';
import Api from '../lib/api';

function conceptListRequest(){
    return {
        type: types.CONCEPT_LIST_REQUEST
    }
}
function conceptListSuccess(concepts){
    return {
        type: types.CONCEPT_LIST_SUCCESS,
        concepts
    }
}
function conceptListFailed(error){
    return{
        type: types.CONCEPT_LIST_FAILURE,
        error
    }
}

export function fetchConceptsFromChapter(chapter_key){
    return (dispatch, getState) => {
        dispatch(conceptListRequest())
        Api.get(`/chapters/${chapter_key}`).then(resp => {
            if(resp.success){
                dispatch(conceptListSuccess(resp.message.chapter.concepts))
            }else{
                dispatch(conceptListFailed(resp.error))
            }
        }).catch( (err) => {
            dispatch(conceptListFailed(err.error))
        })
    }
}