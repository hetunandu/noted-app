import * as types from './types';
import Api from '../lib/api';

function subjectListRequest(){
    return {
        type: types.SUBJECT_LIST_REQUEST
    }
}
function subjectListSuccess(subjects){
    return {
        type: types.SUBJECT_LIST_SUCCESS,
        subjects
    }
}
function subjectListFailed(error){
    return{
        type: types.SUBJECT_LIST_FAILURE,
        error
    }
}

export function fetchSubjectList(){
    return (dispatch, getState) => {
        dispatch(subjectListRequest())
        Api.get('/subjects').then(resp => {
            if(resp.success){
                dispatch(subjectListSuccess(resp.message.subjects))
            }else{
                dispatch(subjectListFailed(resp.error))
            }
        }).catch( (err) => {
            dispatch(subjectListFailed(err.error))
        })
    }
}