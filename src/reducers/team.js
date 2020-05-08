import {
    TEAM_BY_ID_REQUEST,
    TEAM_BY_ID_ERROR,
    TEAM_BY_ID_SUCCESS,
    SAVE_REQUEST,
    SAVE_ERROR,
    SAVE_SUCCESS,
    SAVE_REFRESH,
    PATCH_REQUEST,
    PATCH_ERROR,
    PATCH_SUCCESS,
    PATCH_REFRESH,
    DELETE_REQUEST,
    DELETE_ERROR,
    DELETE_SUCCESS,
    DELETE_REFRESH,
} from '../actions/team';

import { formations } from '../utils/formations';

const initialState = {
    idTeam_isFetching: false,
    idTeam_error: null,
    myTeam: formations[0],
    save_isSaving: false,
    save_error: null,
    save_success: false,
    delete_isDeleting: false,
    delete_error: null,
    delete_success: false,
    patch_isPatching: false,
    patch_error: null,
    patch_success: false,
    myPlayer: {},
    fetchedTeam: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TEAM_BY_ID_REQUEST:
            return {
                ...state,
                idTeam_isFetching: action.idTeam_isFetching,
                idTeam_error: action.idTeam_error,
                fetchedTeam: action.fetchedTeam
            }
        case TEAM_BY_ID_SUCCESS:
            return {
                ...state,
                idTeam_isFetching: action.idTeam_isFetching,
                idTeam_error: action.idTeam_error,
                fetchedTeam: action.fetchedTeam
            }
        case TEAM_BY_ID_ERROR:
            return {
                ...state,
                idTeam_isFetching: action.idTeam_isFetching,
                idTeam_error: action.idTeam_error,
                fetchedTeam: action.fetchedTeam
            }
        case SAVE_REQUEST:
            return {
                ...state,
                save_isSaving: action.save_isSaving,
                save_error: action.save_error,
                save_success: action.save_success,
            }
        case SAVE_SUCCESS:
            return {
                ...state,
                save_isSaving: action.save_isSaving,
                save_success: action.save_success,
                id: action.id,
            }
        case SAVE_ERROR:
            return {
                ...state,
                save_isSaving: action.save_isSaving,
                save_error: action.save_error,
                save_success: action.save_success,
            }
        case SAVE_REFRESH:
            return {
                ...state,
                save_isSaving: action.save_isSaving,
                save_error: action.save_error,
                save_success: action.save_success,
            }
        case PATCH_REQUEST:
            return {
                ...state,
                patch_isSaving: action.patch_isSaving,
                patch_error: action.patch_error,
                patch_success: action.patch_success,
            }
        case PATCH_SUCCESS:
            return {
                ...state,
                patch_isSaving: action.patch_isSaving,
                patch_success: action.patch_success,
                patch_error: action.patch_error,
                id: action.id,
            }
        case PATCH_ERROR:
            return {
                ...state,
                patch_isSaving: action.patch_isSaving,
                patch_error: action.patch_error,
                patch_success: action.patch_success,
            }
        case PATCH_REFRESH:
            return {
                ...state,
                patch_isSaving: action.patch_isSaving,
                patch_error: action.patch_error,
                patch_success: action.patch_success,
            }
        case DELETE_REQUEST:
            return {
                ...state,
                delete_isSaving: action.delete_isDeleting,
                delete_error: action.delete_error,
                delete_success: action.delete_success,
            }
        case DELETE_SUCCESS:
            return {
                ...state,
                delete_isDeleting: action.delete_isDeleting,
                delete_success: action.delete_success,
                delete_error: action.delete_error,
            }
        case DELETE_ERROR:
            return {
                ...state,
                delete_isDeleting: action.delete_isDeleting,
                delete_error: action.delete_error,
                delete_success: action.delete_success,
            }
        case DELETE_REFRESH:
            return {
                ...state,
                delete_isDeleting: action.delete_isDeleting,
                delete_error: action.delete_error,
                delete_success: action.delete_success,
            }
        
        default:
            return state;
    }
}