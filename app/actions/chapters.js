import * as types from './types';
import Api from '../lib/api';

function chapterListRequest(){
    return {
        type: types.CHAPTER_LIST_REQUEST
    }
}
function chapterListSuccess(chapters){
    return {
        type: types.CHAPTER_LIST_SUCCESS,
        chapters
    }
}
function chapterListFailed(error){
    return{
        type: types.CHAPTER_LIST_FAILURE,
        error
    }
}

export function fetchChapterList(subject_key){
    return (dispatch, getState) => {
        dispatch(chapterListRequest())
        Api.get(`/subjects/${subject_key}/chapters`).then(resp => {
            if(resp.success){
                dispatch(chapterListSuccess(resp.message.chapters))
            }else{
                dispatch(chapterListFailed(resp.error))
            }
        }).catch( (err) => {
            dispatch(chapterListFailed(err.error))
        })
    }
}