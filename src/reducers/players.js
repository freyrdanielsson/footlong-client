import {
    TEAMS_REQUEST,
    TEAMS_ERROR,
    TEAMS_SUCCESS,
    PLAYERS_REQUEST,
    PLAYERS_ERROR,
    PLAYERS_SUCCESS,
} from '../actions/players';

const initialState = {
    teams_isFetching: false,
    teams_error: null,
    teams: [],
    players_isFetching: false,
    players_error: null,
    players: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TEAMS_REQUEST:
            return {
                ...state,
                teams_isFetching: action.teams_isFetching,
                teams_error: action.teams_error,
                teams: action.teams
            }
        case TEAMS_SUCCESS:
            return {
                ...state,
                teams_error: action.teams_error,
                teams_isFetching: action.teams_isFetching,
                teams: action.teams,
            }
        case TEAMS_ERROR:
            return {
                ...state,
                teams_isFetching: action.teams_isFetching,
                teams_error: action.teams_error,
                teams: action.teams
            }
        case PLAYERS_REQUEST:
            return {
                ...state,
                players_isFetching: action.players_isFetching,
                players_error: action.players_error,
                players: action.players
            }
        case PLAYERS_SUCCESS:
            return {
                ...state,
                players_isFetching: action.players_isFetching,
                players: action.players,
                players_error: action.players_error
            }
        case PLAYERS_ERROR:
            return {
                ...state,
                players_isFetching: action.players_isFetching,
                players_error: action.players_error,
                players: action.players
            }

        default:
            return state;
    }
}