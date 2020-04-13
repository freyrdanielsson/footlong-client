import { combineReducers } from 'redux'
import auth from './auth';
import leagues from './leagues';
import highlights from './highlights';
import register from './register';

export default combineReducers({
    auth,
    highlights,
    leagues,
    register,
})