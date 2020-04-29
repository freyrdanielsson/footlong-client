import api from '../api';

export const TEAMS_REQUEST = 'TEAMS_REQUEST';
export const TEAMS_ERROR = 'TEAMS_ERROR';
export const TEAMS_SUCCESS = 'TEAMS_SUCCESS';
export const PLAYERS_REQUEST = 'PLAYERS_REQUEST';
export const PLAYERS_ERROR = 'PLAYERS_ERROR';
export const PLAYERS_SUCCESS = 'PLAYERS_SUCCESS';

function requestTeams() {
    return {
        type: TEAMS_REQUEST,
        teams_isFetching: true,
        teams_error: null,
    }
}

function teamsError(error) {
    return {
        type: TEAMS_ERROR,
        teams_isFetching: false,
        teams_error: error,
    }
}

function teamsSuccess(teams) {
    return {
        type: TEAMS_SUCCESS,
        teams_isFetching: false,
        teams,
    }
}

function requestPlayers() {
    return {
        type: PLAYERS_REQUEST,
        players_isFetching: true,
        players_error: null,
    }
}

function playersError(error) {
    return {
        type: PLAYERS_ERROR,
        players_isFetching: false,
        players_error: error,
    }
}

function playersSuccess(players) {
    return {
        type: PLAYERS_SUCCESS,
        players_isFetching: false,
        players,
    }
}

export function fetchTeams() {
    return async (dispatch) => {
        dispatch(requestTeams());
        let result;
        try {
            result = await api.get('/players');
        } catch(e) {
            return dispatch(teamsError(e));
        }
        
        if (result.status === 500 || result.data.error) {
            dispatch(teamsError('Unable to get Squads'))
        }

        dispatch(teamsSuccess(result.data));
    }
}

export function fetchPlayers(id) {
    return async (dispatch) => {
        dispatch(requestPlayers());
        let result;
        try {
            result = await api.get(`/players/${id}`);
        } catch(e) {
            return dispatch(playersError(e));
        }
        
        if (result.status === 500 || result.data.error) {
            dispatch(playersError('Unable to get Squad'))
        }

        dispatch(playersSuccess(result.data[0].api.players));
    }
}