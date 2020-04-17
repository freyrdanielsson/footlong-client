import api from '../api';

export const HIGHLIGHTS_REQUEST = 'HIGHLIGHTS_REQUEST';
export const HIGHLIGHTS_ERROR = 'HIGHLIGHTS_ERROR';
export const HIGHLIGHTS_SUCCESS = 'HIGHLIGHTS_SUCCESS';

function requestHighlights() {
    return {
        type: HIGHLIGHTS_REQUEST,
        isFetching: true,
        error: null,
    }
}

function highlightsError(error) {
    return {
        type: HIGHLIGHTS_ERROR,
        isFetching: false,
        highlights: [],
        error: error,
    }
}

function highlightsSuccess(highlights) {
    return {
        type: HIGHLIGHTS_SUCCESS,
        isFetching: false,
        highlights,
        error: null,
    }
}

export default function fetchHighlights() {
    // Thunk
    return async (dispatch) => {
        dispatch(requestHighlights());
        let highlights;
        try {
            highlights = await api.get('/highlights');
        } catch(e) {
            return dispatch(highlightsError(e));
        }

        if (highlights && highlights.ok) {
            dispatch(highlightsSuccess(highlights.data));
        }
    }
}


