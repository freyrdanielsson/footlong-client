import { combineReducers } from 'redux'
import auth from './auth';
import leagues from './leagues';
import highlights from './highlights';

export default combineReducers({
    auth,
    highlights,
    leagues,
})