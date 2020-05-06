import api from '../api';

export const CUSTOM_TEAMS_REQUEST = 'CUSTOM_TEAMS_REQUEST';
export const CUSTOM_TEAMS_ERROR = 'CUSTOM_TEAMS_ERROR';
export const CUSTOM_TEAMS_SUCCESS = 'CUSTOM_TEAMS_SUCCESS';

function customTeamsRequest() {
    return {
        type: CUSTOM_TEAMS_REQUEST,
        customTeams_isFetching: true,
        customTeams_error: null,
    }
}

function customTeamsError(error) {
    return {
        type: CUSTOM_TEAMS_ERROR,
        customTeams_isFetching: false,
        customTeams_error: error,
    }
}

function customTeamsSuccess(customTeams) {
    return {
        type: CUSTOM_TEAMS_SUCCESS,
        customTeams_isFetching: false,
        customTeams,
    }
}

export function fetchCustomTeams(endpoint) {
    return async (dispatch) => {
        dispatch(customTeamsRequest());
        let result;
        try {
            result = await api.get(endpoint);
        } catch(e) {
            return dispatch(customTeamsError(e));
        }

        if (result.status === 404 ) {
            return dispatch(customTeamsError('No Squads Found'))
        }
        
        if (result.status === 500 || result.data.error) {
            return dispatch(customTeamsError('Unable to get Squads'))
        }

        dispatch(customTeamsSuccess(result.data));
    }
}
