import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DonateReducer from './DonateReducer';
import RequestReducer from './RequestReducer';

export default combineReducers({
    auth : AuthReducer,
    donate: DonateReducer,
    request: RequestReducer
});