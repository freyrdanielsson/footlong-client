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
    return async (dispatch) => {
        dispatch(requestLeagues());
        let result;
        try {
            result = await api.get(`/football/${date}`);
        } catch (e) {
            return dispatch(leaguesError(e));
        }

        if (result.status === 500 || result.data.error) {
            dispatch(leaguesError('Unable to get fixtures'))
        }

        dispatch(leaguesSuccess(result.data));
    }
}

function requestFixture(fixture) {
    return {
        type: FIXTURE_REQUEST,
        fixture_isFetching: true,
        fixture_error: null,
        fixture
    }
}

function fixtureError(error) {
    return {
        type: FIXTURE_ERROR,
        fixture_isFetching: false,
        fixture_error: error,
    }
}

function fixtureSuccess(fixture_events, fixture_stats) {
    return {
        type: FIXTURE_SUCCESS,
        fixture_isFetching: false,
        fixture_events,
        fixture_stats,
    }
}

export function fetchFixtureDetails(fixture) {
    // Thunk
    return async (dispatch) => {
        dispatch(requestFixture(fixture));

        if (fixture === null) return;

        let events_res;
        let stats_res;
        try {
            [
                events_res,
                stats_res, // might be empty
            ] = await Promise.all([
                api.get(`/football/fixture/events/${fixture.fixture_id}`),
                api.get(`/football/fixture/statistics/${fixture.fixture_id}`)
            ])
        } catch (e) {
            return dispatch(fixtureError(e));
        }

        if (events_res.status === 500 || events_res.data.error
            || stats_res.status === 500 || stats_res.data.error) {
            dispatch(fixtureError('Unable to get fixture details'))
        }

        dispatch(fixtureSuccess(events_res.data, stats_res.data));
    }
}
