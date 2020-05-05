import {
    LEAGUES_REQUEST,
    LEAGUES_ERROR,
    LEAGUES_SUCCESS,
    FIXTURE_REQUEST,
    FIXTURE_ERROR,
    FIXTURE_SUCCESS,
} from '../actions/fixtures';

const initialState = {
    leagues_isFetching: false,
    leagues_error: null,
    leagues: [],
    fixture_isFetching: false,
    fixture_error: null,
    fixture_events: null,
    fixture_stats: null,
    fixture: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LEAGUES_REQUEST:
            return {
                ...state,
                leagues_isFetching: action.leagues_isFetching,
                leagues_error: action.leagues_error,
            }
        case LEAGUES_SUCCESS:
            return {
                ...state,
                leagues_isFetching: action.leagues_isFetching,
                leagues: action.leagues,
            }
        case LEAGUES_ERROR:
            return {
                ...state,
                leagues_isFetching: action.leagues_isFetching,
                leagues_error: action.leagues_error,
            }
        case FIXTURE_REQUEST:
            return {
                ...state,
                fixture: action.fixture,
                fixture_isFetching: action.fixture_isFetching,
                fixture_error: action.fixture_error,
            }
        case FIXTURE_SUCCESS:
            return {
                ...state,
                fixture_isFetching: action.fixture_isFetching,
                fixture_events: action.fixture_events,
                fixture_stats: action.fixture_stats,
            }
        case FIXTURE_ERROR:
            return {
                ...state,
                fixture_isFetching: action.fixture_isFetching,
                fixture_error: action.fixture_error,
            }

        default:
            return state;
    }
}