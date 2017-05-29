import * as types from '../constants/ActionTypes';
import { requestBlob } from '../utils/RequestUtils';

export function fetchLogin(phone, pswd) {
    return dispatch => {
        dispatch(fetchLoginStart());
        return requestBlob('auth/login/', {
            phone,
            pswd
        })
            .then(result => {
                dispatch(receiveLoginResponse(result));
            })
            .catch(msg => {
                dispatch(loginError(msg));
            })
    }
}

export function fetchRegister(phone, pswd, pswdCfm) {
    return dispatch => {
        dispatch(fetchRegisterStart());
        return requestBlob('auth/register/', {
            phone,
            pswd,
            pswdCfm
        })
            .then(result => {
                dispatch(receiveRegisterResponse(result))
            })
            .catch(msg => {
                dispatch(registerError(msg));
            })
    }
}

function fetchLoginStart() {
    return {
        type: types.FETCH_LOGIN_START
    }
}

function loginError(msg) {
    return {
        type: types.FETCH_LOGIN_ERROR,
        msg
    }
}

function receiveLoginResponse(result) {
    return {
        type: types.FETCH_LOGIN_SUCCESS,
        result
    }
}

function fetchRegisterStart() {
    return {
        type: types.FETCH_REGISTER_START
    }
}

function registerError(msg) {
    return {
        type: types.FETCH_REGISTER_ERROR,
        msg
    }
}

function fetchRegisterSuccess(result) {
    return {
        type: types.FETCH_REGISTER_SUCCESS,
        result
    }
}