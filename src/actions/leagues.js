import api from '../api';

export const LEAGUES_REQUEST = 'LEAGUES_REQUEST';
export const LEAGUES_ERROR = 'LEAGUES_ERROR';
export const LEAGUES_SUCCESS = 'LEAGUES_SUCCESS';

function requestLeagues() {
    return {
        type: LEAGUES_REQUEST,
        isFetching: true,
        error: null,
    }
}

function leaguesError(error) {
    return {
        type: LEAGUES_ERROR,
        isFetching: false,
        books: [],
        error: error,
    }
}

function leaguesSuccess(leagues) {
    return {
        type: LEAGUES_SUCCESS,
        isFetching: false,
        leagues,
        error: null,
    }
}

export function fetchLeagues(url) {
    // Thunk
    return async (dispatch) => {
        dispatch(requestLeagues());
        let leagues;
        try {
            leagues = await api();
        } catch(e) {
            return dispatch(leaguesError(e));
        }

        dispatch(leaguesSuccess(leagues));
    }
}


