import axios from 'axios';
import {returnErrors} from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./type";


export const loadUser = () => (dispatch, getState) => {
    
    dispatch({type: USER_LOADING});
    
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type : AUTH_ERROR
            });
        });
};

export const register = ({name, email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password});

    axios.post('/api/users', body, config)
        .then(response => dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'Register Fail'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

export const login = ({email, password}) => dispatch  => {
    
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({email, password});

    axios.post('/api/auth', body, config)
        .then(response => dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const  tokenConfig = getState => {

    const token = getState().auth.token;
    
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }
    return config;
};