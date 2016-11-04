import * as types from './types';
import Api from '../lib/api';
import {AsyncStorage} from 'react-native';


function setAuth(isAuthenticated){
    return {
        type: types.SET_AUTH,
        isAuthenticated
    }
}


function loginRequest(){
    return {
        type: types.LOGIN_REQUEST
    }
}
function loginSuccess(user){
    return {
        type: types.LOGIN_SUCCESS,
        user
    }
}
function loginFailed(error){
    return{
        type: types.LOGIN_FAILURE,
        error
    }
}

export function checkToken(){
    return (dispatch, getState) => {
        try{
            AsyncStorage.getItem('login_token')
                .then((token) => {
                    if(token){
                        dispatch(setAuth(true))
                    }else{
                        dispatch(setAuth(false))
                    }
                })
                .done();
        }catch (err){
           dispatch(setAuth(false))
        }
    }
}

export function login(token){
    return (dispatch, getState) => {
        dispatch(loginRequest())
        Api.post('/users/social', token).then(resp => {
            if(resp.success){
                try {
                    AsyncStorage.setItem('login_token', resp.message.token)
                    dispatch(loginSuccess(resp.message.user))
                } catch (error) {
                    console.error(error)
                }
            }else{
                dispatch(loginFailed(resp.error))
            }
        }).catch( (err) => {
            dispatch(loginFailed(err.error))
        })
    }
}

export function logout(){
    return (dispatch, getState) => {
        try{
            AsyncStorage.removeItem('login_token')
                .then((token) => {
                    dispatch(setAuth(false))
                })
                .done();
        }catch (err){
           dispatch(setAuth(true))
        }
    }
}