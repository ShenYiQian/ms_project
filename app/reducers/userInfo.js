import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    isLogin: false,
    isRegister: false,
    isLoading: false
};

export default function userInfo(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_LOGIN_START:
        case ActionTypes.FETCH_REGISTER_START:
            return { ...state, isLoading: true, payload: null };
        case ActionTypes.FETCH_LOGIN_ERROR:
            return { ...state, isLoading: false, payload: action.msg, isLogin: false };
        case ActionTypes.FETCH_REGISTER_ERROR:
            return { ...state, isLoading: false, payload: action.msg, isRegister: false };
        case ActionTypes.FETCH_LOGIN_SUCCESS:
            return { ...state, isLoading: false, payload: action.result, isLogin: true }
        case ActionTypes.FETCH_REGISTER_SUCCESS:
            return { ...state, isLoading: false, payload: action.result, isRegister: true }
        default:
            return state;
    }
}