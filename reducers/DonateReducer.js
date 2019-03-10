import { DONATE_UPDATE, REQUEST_CREATE, REQUEST_FETCH } from '../actions/Types';

const INITIAL_STATE = {
    loc: '',
    phone: '',
    address: '',
    people: ''
};

export default(state = INITIAL_STATE, action) => {
    console.log(action);
    switch(action.type) {
        case DONATE_UPDATE:
            return { ...state, [action.payload.prop]: [action.payload.value] };
        case REQUEST_CREATE:
            return INITIAL_STATE;
        case REQUEST_FETCH:
            return action.payload
        default:
            return state;
    }
}