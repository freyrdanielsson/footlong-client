import {
    CUSTOM_TEAMS_REQUEST,
    CUSTOM_TEAMS_ERROR,
    CUSTOM_TEAMS_SUCCESS,
} from '../actions/teams';

const initialState = {
    customTeams_isFetching: false,
    customTeams_error: null,
    customTeams: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CUSTOM_TEAMS_REQUEST:
            return {
                ...state,
                customTeams_isFetching: action.customTeams_isFetching,
                customTeams_error: action.customTeams_error,
            }
        case CUSTOM_TEAMS_SUCCESS:
            return {
                ...state,
                customTeams_isFetching: action.customTeams_isFetching,
                customTeams: action.customTeams,
            }
        case CUSTOM_TEAMS_ERROR:
            return {
                ...state,
                customTeams_isFetching: action.customTeams_isFetching,
                customTeams_error: action.customTeams_error,
            }
        
        default:
            return state;
    }
}