import {
    TEAMS_REQUEST,
    TEAMS_ERROR,
    TEAMS_SUCCESS,
    PLAYERS_REQUEST,
    PLAYERS_ERROR,
    PLAYERS_SUCCESS,
    MY_TEAM_SET,
} from '../actions/players';

const {
    formations
} = require('../utils/formations');

const initialState = {
    teams_isFetching: false,
    teams_error: null,
    players_isFetching: false,
    players_error: null,
    teams: [],
    players: [],
    myTeam: formations[0],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TEAMS_REQUEST:
            return {
                ...state,
                teams_isFetching: action.teams_isFetching,
                teams_error: action.teams_error,
            }
        case TEAMS_SUCCESS:
            return {
                ...state,
                teams_isFetching: action.teams_isFetching,
                teams: action.teams,
            }
        case TEAMS_ERROR:
            return {
                ...state,
                teams_isFetching: action.teams_isFetching,
                teams_error: action.teams_error,
            }
        case PLAYERS_REQUEST:
            return {
                ...state,
                players_isFetching: action.players_isFetching,
                players_error: action.players_error,
            }
        case PLAYERS_SUCCESS:
            return {
                ...state,
                players_isFetching: action.players_isFetching,
                players: action.players,
            }
        case PLAYERS_ERROR:
            return {
                ...state,
                players_isFetching: action.players_isFetching,
                players_error: action.players_error,
            }
        case MY_TEAM_SET:
            return {
                ...state,
                myTeam: action.myTeam,
            }

        default:
            return state;
    }
}