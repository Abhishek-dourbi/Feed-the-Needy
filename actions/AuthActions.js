import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    SIGNUP_USER_SUCCESS, 
    LOGIN_USER_FAIL, 
    LOGIN_USER, 
    } from './Types';
import firebase from 'firebase';

export const emailChanged = (text) => {
    return{
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return{
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }, callback) => {
    return(dispatch) => {
        dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then( user => loginUserSuccess(dispatch, user, callback))
        .catch(() => loginUserFail(dispatch));
    };
};

export const signUpUser = ({ email, password }, callback) => {
    return(dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => signUpUserSuccess(dispatch, user, callback))
        .catch(() => loginUserFail(dispatch));
    };
};

const loginUserFail = (dispatch) => {
    dispatch({type: LOGIN_USER_FAIL});
};


const signUpUserSuccess = (dispatch, user, callback) => {
    dispatch({
        type: SIGNUP_USER_SUCCESS,
        payload: user
    });
    callback();
};

const loginUserSuccess = (dispatch, user, callback) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    callback();
};