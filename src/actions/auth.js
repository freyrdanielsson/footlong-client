import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
    }
}

export const receiveLogin = (user) => {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user: user,
        message: null,
    }
}

export const loginError = (message) => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        user: null,
        message
    }
}

export const loginUser = (username, password) => {
    return async (dispatch) => {
        dispatch(requestLogin());

        let login;
        try {
            login = await api.post('/login', { 'username': username, 'password': password });
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
            window.localStorage.setItem('user', JSON.stringify(user))
            dispatch(receiveLogin(user));
        }
    }
}

function logout() {
    return {
        type: LOGIN_LOGOUT,
        isFetching: false,
        isAuthenticated: false,
        user: null,
        message: undefined,
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        dispatch(logout());
    }
}

function requestUpload() {
    return {
        type: UPDATE_USER_REQUEST,
        isFetching: true,
        message: null,
    }
}

function receiveUpload(user) {
    return {
        type: UPDATE_USER_SUCCESS,
        isFetching: false,
        user,
        message: {field: 'success', message: 'Profile updated!'},
    }
}

export function uploadError(message) {
    const msg = message.validation && message.validation.length > 0
        ?   message.validation[0]
        :   { field: 'error', message: message.error }
    return {
        type: UPDATE_USER_FAILURE,
        isFetching: false,
        message: msg
    }
}


export const updateUser = (userInfo) => {
    return async (dispatch) => {
        dispatch(requestUpload());

        let update;
        try {
            update = await api.patch('/users/me', userInfo);
        } catch (e) {
            return dispatch(uploadError(e))
        }

        if (update.result && update.result.errors) {
            dispatch(uploadError(update.result.errors));
        }
        
        if (!update.ok) {
            dispatch(uploadError(update.data));
        }
        

        if (update.status === 200) {
            const user = update.data;
            // Important to update current user information!
            window.localStorage.setItem('user', JSON.stringify(user))
            dispatch(receiveUpload(user));
        }
    }
}
