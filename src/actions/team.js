import api from '../api';

export const TEAM_BY_ID_REQUEST = 'TEAM_BY_ID_REQUEST';
export const TEAM_BY_ID_ERROR = 'TEAM_BY_ID_ERROR';
export const TEAM_BY_ID_SUCCESS = 'TEAM_BY_ID_SUCCESS';

function teamByIdRequest() {
    return {
        type: TEAM_BY_ID_REQUEST,
        idTeam_isFetching: true,
        idTeam_error: null,
    }
}

function teamByIdError(error) {
    return {
        type: TEAM_BY_ID_ERROR,
        idTeam_isFetching: false,
        idTeam_error: error,
    }
}

function teamByIdSuccess(idTeam) {
    return {
        type: TEAM_BY_ID_SUCCESS,
        idTeam_isFetching: false,
        idTeam,
    }
}

export function fetchTeamById(id) {
    return async (dispatch) => {
        dispatch(teamByIdRequest());
        let result;
        try {
            result = await api.get(`/custom-teams/${id}`);
        } catch(e) {
            return dispatch(teamByIdError(e));
        }

        if (result.status === 404 ) {
            return dispatch(teamByIdError('Team Not Found'))
        }
        
        if (result.status === 500 || result.data.error) {
            return dispatch(teamByIdError('Unable to get team'))
        }

        dispatch(teamByIdSuccess(result.data));
    }
}