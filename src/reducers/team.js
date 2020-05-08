import {
    TEAM_BY_ID_REQUEST,
    TEAM_BY_ID_ERROR,
    TEAM_BY_ID_SUCCESS,
    SAVE_REQUEST,
    SAVE_ERROR,
    SAVE_SUCCESS,
    DELETE_REQUEST,
    DELETE_ERROR,
    DELETE_SUCCESS,
    MY_TEAM_SET,
    MY_TEAM_PLAYER_SET,
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
                fetchedTeam: action.fetchedTeam,
            }
        case TEAM_BY_ID_ERROR:
            return {
                ...state,
                idTeam_isFetching: action.idTeam_isFetching,
                idTeam_error: action.idTeam_error,
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
            }
        case SAVE_ERROR:
            return {
                ...state,
                save_isSaving: action.save_isSaving,
                save_error: action.save_error,
                save_success: action.save_success,
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
            }
        case DELETE_ERROR:
            return {
                ...state,
                delete_isDeleting: action.delete_isDeleting,
                delete_error: action.delete_error,
                delete_success: action.delete_success,
            }
        case MY_TEAM_SET:
            return {
                ...state,
                myTeam: action.myTeam,
            }
        case MY_TEAM_PLAYER_SET:
            return {
                ...state,
                myPlayer: action.myPlayer,
            }
        
        default:
            return state;
    }
}