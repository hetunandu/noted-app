import * as types from './types';
import Api from '../lib/api';
import {AsyncStorage, ToastAndroid} from 'react-native';
import {GoogleSignin} from 'react-native-google-signin';


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
        AsyncStorage.getItem('login_token')
            .then((token) => {
                if(token){
                    dispatch(setAuth(true))
                }else{
                    dispatch(setAuth(false))
                }
            })
            .done();
    }
}

export function login(token) {

    let config = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(token)
    };

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(loginRequest())

        return fetch(`https://noted-api.appspot.com/users/social`, config)
            .then(res => res.json())
            .then(json => {
                if(json.success === false){
                    dispatch(loginFailed(json.error))
                }else{
                    // If login was successful, set the token in local storage
                    AsyncStorage.setItem('login_token', json.message.token);
                    // Dispatch the success action
                    dispatch(loginSuccess(json.message.user))
                }
            })
            .catch(err => console.log(err))
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

export function googleAuthInit(){
    return (dispatch, getState) => {
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            GoogleSignin.configure({
                webClientId: '865864307125-gob0frva3ifb10ahm39nrj4e1hi74jeq.apps.googleusercontent.com'
            })
        })
        .catch((err) => {
            ToastAndroid.show(`Play services error: ${err.code} ${err.message}`, ToastAndroid.SHORT)
        })
    }
}