import api from '../api';

export const LEAGUES_REQUEST = 'LEAGUES_REQUEST';
export const LEAGUES_ERROR = 'LEAGUES_ERROR';
export const LEAGUES_SUCCESS = 'LEAGUES_SUCCESS';
export const FIXTURE_REQUEST = 'FIXTURE_REQUEST';
export const FIXTURE_ERROR = 'FIXTURE_ERROR';
export const FIXTURE_SUCCESS = 'FIXTURE_SUCCESS';

function requestLeagues() {
    return {
        type: LEAGUES_REQUEST,
        leagues_isFetching: true,
        leagues_error: null,
    }
}

function leaguesError(error) {
    return {
        type: LEAGUES_ERROR,
        leagues_isFetching: false,
        leagues_error: error,
    }
}

function leaguesSuccess(leagues) {
    return {
        type: LEAGUES_SUCCESS,
        leagues_isFetching: false,
        leagues,
    }
}

export function fetchLeagues(date) {
    // Thunk
    return async (dispatch) => {
        dispatch(requestLeagues());
        let result;
        try {
            result = await api.get(`/football/${date}`);
        } catch(e) {
            return dispatch(leaguesError(e));
        }
        
        if (result.status === 500 || result.data.error) {
            dispatch(leaguesError('Unable to get fixtures'))
        }

        dispatch(leaguesSuccess(result.data));
    }
}
