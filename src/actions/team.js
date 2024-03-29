import api from '../api';
import { formations } from '../utils/formations';

export const TEAM_BY_ID_REQUEST = 'TEAM_BY_ID_REQUEST';
export const TEAM_BY_ID_ERROR = 'TEAM_BY_ID_ERROR';
export const TEAM_BY_ID_SUCCESS = 'TEAM_BY_ID_SUCCESS';
export const SAVE_REQUEST = 'SAVE_REQUEST';
export const SAVE_ERROR = 'SAVE_ERROR';
export const SAVE_SUCCESS = 'SAVE_SUCCESS';
export const SAVE_REFRESH = 'SAVE_REFRESH';
export const PATCH_REQUEST = 'PATCH_REQUEST';
export const PATCH_ERROR = 'PATCH_ERROR';
export const PATCH_SUCCESS = 'PATCH_SUCCESS';
export const PATCH_REFRESH = 'PATCH_REFRESH';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const DELETE_ERROR = 'DELETE_ERROR';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_REFRESH = 'DELETE_REFRESH';
export const MY_TEAM_SET = 'MY_TEAM_SET';
export const MY_TEAM_PLAYER_SET = 'MY_TEAM_PLAYER_SET';


function teamByIdRequest(fetchedTeam) {
    return {
        type: TEAM_BY_ID_REQUEST,
        idTeam_isFetching: true,
        idTeam_error: null,
        fetchedTeam,
        save_success: false,
        save_isSaving: false,
        save_error: null,
        id: null,
        patch_isSaving: false,
        patch_success: false,
        patch_error: null,
        delete_isDeleting: false,
        delete_success: false,
        delete_error: null,
    }
}

function teamByIdError(error) {
    return {
        type: TEAM_BY_ID_ERROR,
        idTeam_isFetching: false,
        idTeam_error: error,
        fetchedTeam: null
    }
}

function teamByIdSuccess(fetchedTeam) {
    return {
        type: TEAM_BY_ID_SUCCESS,
        idTeam_isFetching: false,
        idTeam_error: null,
        fetchedTeam
    }
}

export function fetchTeamById(id) {
    return async (dispatch) => {
        dispatch(teamByIdRequest(id));
        if(id === null) return;

        let result;
        try {
            result = await api.get(`/custom-teams/${id}`);
        } catch (e) {
            return dispatch(teamByIdError(e));
        }

        if (result.status === 404) {
            return dispatch(teamByIdError('Team Not Found'))
        }

        if (result.status === 500 || result.data.error) {
            return dispatch(teamByIdError(result.data.error))
        }

        const parsedLineup = JSON.parse(result.data.lineup);
        result.data.lineup = parsedLineup;

        dispatch(teamByIdSuccess(result.data));
    }
}

function saveRequest() {
    return {
        type: SAVE_REQUEST,
        save_isSaving: true,
        save_error: null,
        save_success: false,
        id: null,
        idTeam_isFetching: false,
        idTeam_error: null,
        fetchedTeam: null,
        patch_isSaving: false,
        patch_success: false,
        patch_error: null,
        delete_isDeleting: false,
        delete_success: false,
        delete_error: null,

    }
}

function saveError(error) {
    const err = error.validation && error.validation.length > 0
        ? error.validation[0].message
        : error.error;
    return {
        type: SAVE_ERROR,
        save_isSaving: false,
        save_error: err,
        save_success: false,
        id: null
    }
}

function saveSuccess(id) {
    return {
        type: SAVE_SUCCESS,
        save_isSaving: false,
        save_success: true,
        save_error: null,
        id,
    }
}

export function createTeam(teamHeader) {
    return async (dispatch) => {
        dispatch(saveRequest());
        let result;
        try {
            result = await api.post('/custom-teams', {
                ...teamHeader,
                lineup: JSON.stringify(formations[0]),
            });
        } catch (e) {
            return dispatch(saveError(e));
        }
                
        if (result.status === 400) {
            return dispatch(saveError(result.data));
        }
        
        if (result.status === 500 || result.data.error) {
            return dispatch(saveError(result.data))
        }        
        
        dispatch(saveSuccess(result.data.id));
    }
}

function patchRequest() {
    return {
        type: PATCH_REQUEST,
        patch_isSaving: true,
        patch_error: null,
        patch_success: false,
        id: null,
        idTeam_isFetching: false,
        idTeam_error: null,
        fetchedTeam: null,
        save_isSaving: false,
        save_error: null,
        save_success: false,
        delete_isDeleting: false,
        delete_success: false,
        delete_error: null,
    }
}

function patchError(error) {
    const err = error.validation && error.validation.length > 0
    ? error.validation[0].message
    : error.error;
    return {
        type: PATCH_ERROR,
        patch_isSaving: false,
        patch_error: err,
        patch_success: false,
        id: null
    }
}

function patchSuccess(id) {
    return {
        type: PATCH_SUCCESS,
        patch_isSaving: false,
        patch_success: true,
        patch_error: null,
        id,
    }
}

export function patchTeam(id, team) {
    return async (dispatch) => {
        dispatch(patchRequest());
        let result;
        try {
            result = await api.patch(`/custom-teams/${id}`, team);
        } catch (e) {
            return dispatch(patchError(e));
        }

        if (result.status === 400) {
            return dispatch(patchError(result.data));
        }

        if (result.status === 500 || result.data.error) {
            return dispatch(patchError({ error: 'Error saving team'}));
        }

        dispatch(patchSuccess(id));
    }
}

function deleteRequest() {
    return {
        type: DELETE_REQUEST,
        delete_isDeleting: true,
        delete_error: null,
        delete_success: false,
        idTeam_isFetching: false,
        idTeam_error: null,
        fetchedTeam: null,
        save_isSaving: false,
        save_error: null,
        save_success: false,
        id: null,
        patch_isSaving: false,
        patch_error: null,
        patch_success: false,
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
        delete_error: null
    }
}

export function deleteTeam(id) {
    return async (dispatch) => {
        dispatch(deleteRequest());
        let result;
        try {
            result = await api.delete(`/custom-teams/${id}`);
        } catch (e) {
            return dispatch(deleteError(e));
        }

        if (result.status === 500 || result.data.error) {
            return dispatch(deleteError('Could not delete team'))
        }

        dispatch(deleteSuccess());
    }
}
