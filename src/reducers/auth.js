import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_LOGOUT, LOGIN_FETCH, LOGIN_FETCH_FAILURE } from '../actions/auth';

const token = window.localStorage.getItem('token') || null;

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  isFetchingProfile: token ? true : false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        isFetchingProfile: action.isFetchingProfile,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        message: action.message,
        isFetchingProfile: action.isFetchingProfile,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message,
        user: action.user,
        isFetchingProfile: action.isFetchingProfile,
      };
    case LOGIN_LOGOUT:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        isFetchingProfile: action.isFetchingProfile,
      };
    case LOGIN_FETCH:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        isFetchingProfile: action.isFetchingProfile,
      };
    case LOGIN_FETCH_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        isFetchingProfile: action.isFetchingProfile,
      };
    default:
      return state;
  }
};