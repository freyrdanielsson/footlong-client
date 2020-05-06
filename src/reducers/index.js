import { combineReducers } from 'redux'
import auth from './auth';
import fixtures from './fixtures';
import highlights from './highlights';
import register from './register';
import players from './players';
import teams from './teams';
import team from './team';

export default combineReducers({
    auth,
    highlights,
    fixtures,
    register,
    players,
    teams,
    team,
})