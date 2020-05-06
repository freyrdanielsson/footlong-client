import api from '../api';

export const TEAM_BY_ID_REQUEST = 'TEAM_BY_ID_REQUEST';
export const TEAM_BY_ID_ERROR = 'TEAM_BY_ID_ERROR';
export const TEAM_BY_ID_SUCCESS = 'TEAM_BY_ID_SUCCESS';
export const SAVE_REQUEST = 'SAVE_REQUEST';
export const SAVE_ERROR = 'SAVE_ERROR';
export const SAVE_SUCCESS = 'SAVE_SUCCESS';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const DELETE_ERROR = 'DELETE_ERROR';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const MY_TEAM_SET = 'MY_TEAM_SET';
export const MY_TEAM_PLAYER_SET = 'MY_TEAM_PLAYER_SET';

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

function teamByIdSuccess(fetchedTeam) {
    return {
        type: TEAM_BY_ID_SUCCESS,
        idTeam_isFetching: false,
        fetchedTeam
    }
}

function deleteRequest() {
    return {
        type: DELETE_REQUEST,
        delete_isDeleting: true,
        delete_error: null,
        delete_success: false,
    }
}

function deleteError(error) {
    return {
        type: DELETE_ERROR,
        delete_isDeleting: false,
        delete_error: error,
        delete_success: false,
    }
}

function deleteSuccess() {
    return {
        type: DELETE_SUCCESS,
        delete_isDeleting: false,
        delete_success: true,
    }
}

function saveRequest() {
    return {
        type: SAVE_REQUEST,
        save_isSaving: true,
        save_error: null,
        save_success: false,
    }
}

function saveError(error) {
    return {
        type: SAVE_ERROR,
        save_isSaving: false,
        save_error: error,
        save_success: false,
    }
}

function saveSuccess() {
    return {
        type: SAVE_SUCCESS,
        save_isSAVING: false,
        save_success: true,
    }
}

function myTeamSet(myTeam) {
    return {
        type: MY_TEAM_SET,
        myTeam,
    }
}

function myPlayerSet(myPlayer) {
    return {
        type: MY_TEAM_PLAYER_SET,
        myPlayer,
    }
}

export function setMyPlayer(player) {
    return (dispatch) => {
        dispatch(myPlayerSet(player));
    }
}

export function setMyTeam(team) {
    return (dispatch) => {
        dispatch(myTeamSet(team));
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

        const teamObj = JSON.parse(result.data[0].lineup);
        dispatch(setMyTeam(teamObj))
        dispatch(teamByIdSuccess(result.data));
    }
}

export function saveTeam(team) {
    return async (dispatch) => {
        dispatch(saveRequest());
        let result;
        try {
            result = await api.post('/custom-teams', team);
        } catch(e) {
            return dispatch(saveError(e));
        }

        if (result.status === 400) {
            return dispatch(saveError(result.data));
        }
        
        if (result.status === 500 || result.data.error) {
            return dispatch(saveError('Could not save team'))
        }

        dispatch(saveSuccess());
    }
}

export function patchTeam(id, team) {
    return async (dispatch) => {
        dispatch(saveRequest());
        let result;
        try {
            result = await api.patch(`/custom-teams/${id}`, team);
        } catch(e) {
            return dispatch(saveError(e));
        }

        if (result.status === 400) {
            return dispatch(saveError(result.data));
        }
        
        if (result.status === 500 || result.data.error) {
            return dispatch(saveError('Could not save team'))
        }

        dispatch(saveSuccess());
    }
}

export function deleteTeam(id) {
    return async (dispatch) => {
        dispatch(deleteRequest());
        let result;
        try {
            result = await api.delete(`/custom-teams/${id}`);
        } catch(e) {
            return dispatch(deleteError(e));
        }
        
        if (result.status === 500 || result.data.error) {
            return dispatch(deleteError('Could not delete team'))
        }

        dispatch(deleteSuccess());
    }
}
