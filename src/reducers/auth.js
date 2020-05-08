import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE
} from '../actions/auth';

const user = JSON.parse(window.localStorage.getItem('user') || 'null');

const initialState = {
    isFetching: false,
    isAuthenticated: user ? true : false,
    user,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                user: action.user,
                message: action.message,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                message: action.message,
                user: action.user,
            };
        case LOGIN_LOGOUT:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                user: action.user,
            };
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching,
                message: action.message,
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                user: action.user,
                message: action.message,
            }
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching,
                message: action.message,
            }
        default:
            return state;
    }
};