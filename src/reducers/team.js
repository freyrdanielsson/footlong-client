import {
    TEAM_BY_ID_REQUEST,
    TEAM_BY_ID_ERROR,
    TEAM_BY_ID_SUCCESS,
} from '../actions/team';

const initialState = {
    idTeam_isFetching: false,
    idTeam_error: null,
    idTeam: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TEAM_BY_ID_REQUEST:
            return {
                ...state,
                idTeam_isFetching: action.idTeam_isFetching,
                idTeam_error: action.idTeam_error,
            }
        case TEAM_BY_ID_SUCCESS:
            return {
                ...state,
                idTeam_isFetching: action.idTeam_isFetching,
                idTeam: action.idTeam,
            }
        case TEAM_BY_ID_ERROR:
            return {
                ...state,
                idTeam_isFetching: action.idTeam_isFetching,
                idTeam_error: action.idTeam_error,
            }
        
        default:
            return state;
    }
}