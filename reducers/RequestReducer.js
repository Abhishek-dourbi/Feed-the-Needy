import {REQUEST_FETCH } from '../actions/Types';

const INITIAL_STATE = {};

export default(state= INITIAL_STATE, action) => {
    console.log(action);
    switch(action.type) {
        case REQUEST_FETCH:
            return action.payload
        default:
            return state;
    }
}