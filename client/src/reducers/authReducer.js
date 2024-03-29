import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS
} from '../actions/type';

const initState = {
    token : localStorage.getItem("token"),
    isAuthenticated : false,
    isLoading : false,
    user : null
}

export default (state = initState, action) => {
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated : true,
                isLoading : false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated : true,
                isLoading : false

            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token : null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return {
                ...state
            }
    }
}