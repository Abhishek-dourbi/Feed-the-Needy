import { DONATE_UPDATE, REQUEST_CREATE, REQUEST_FETCH } from './Types';
import firebase from 'firebase';

export const donateUpdate = ({ prop, value }) => {
    return{
        type: DONATE_UPDATE,
        payload: { prop, value }
    };
};

export const requestSubmit = ({phone, address, latitude, longitude, pick, people, region}) => {
    const { currentUser } = firebase .auth();
    return (dispatch) => {
    firebase.database().ref(`/users/data`)
        .push({ phone, address, latitude, longitude, pick, people, region })
        .then(() => { 
            dispatch({ type: REQUEST_CREATE });
            //dispatch is used here to clear the form entries
        });
    };
};

export const requestFetch = () => {
    return(dispatch) => {
    firebase.auth().onAuthStateChanged(user => {
        firebase.database().ref(`/users/data`)
        .on('value', snapshot => {
            dispatch({ type: REQUEST_FETCH, payload: snapshot.val()});
        });
    })};
};