import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';
export const LOGIN_FETCH = 'LOGIN_FETCH';
export const LOGIN_FETCH_FAILURE = 'LOGIN_FETCH_FAILURE';

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        isFetchingProfile: false,
    }
}

export const receiveLogin = (user) => {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user: user,
        message: null,
        isFetchingProfile: false,
    }
}

export const loginError = (message) => {
    window.localStorage.removeItem('token');
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isFetchingProfile: false,
        isAuthenticated: false,
        user: null,
        message
    }
}

function logout() {
    return {
        type: LOGIN_LOGOUT,
        isFetching: false,
        isFetchingProfile: false,
        isAuthenticated: false,
        user: null,
    }
}

function requestFetch() {
    return {
        type: LOGIN_FETCH,
        isFetching: false,
        isAuthenticated: false,
        isFetchingProfile: true,
    }
}

function fetchError() {
    window.localStorage.removeItem('token');
    return {
        type: LOGIN_FETCH_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        isFetchingProfile: false,
    }
}

export const fetchUser = () => {
    return async (dispatch) => {
        dispatch(requestFetch());

        let req;
        try {
            req = await api.get('/users/me');
        } catch (e) {
            return dispatch(fetchError());
        }

        if (req.data.error) {
            dispatch(fetchError())
        }

        if (req.status === 200) {
            const user = req.data[0];
            dispatch(receiveLogin(user));
        }
    }
}

export const loginUser = (username, password) => {
    return async (dispatch) => {
        dispatch(requestLogin());

        let login;
        try {
            login = await api.post('/login', { "username": username, "password": password });
        } catch (e) {
            return dispatch(loginError(e))
        }

        if (login.result && login.result.errors) {
            dispatch(loginError(login.result.errors[0].message))
        }

        if (login.data && login.data.error) {
            dispatch(loginError(login.data.error))
        }

        if (login.status === 200) {
            const { token, user } = login.data;
            window.localStorage.setItem('token', token);
            dispatch(receiveLogin(user));
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('token');
        dispatch(logout());
    }
}
