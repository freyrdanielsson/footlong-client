import { combineReducers } from 'redux'
import auth from './auth';
import fixtures from './fixtures';
import highlights from './highlights';
import register from './register';
import players from './players';

export default combineReducers({
    auth,
    highlights,
    fixtures,
    register,
    players,
})