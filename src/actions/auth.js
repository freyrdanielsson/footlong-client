import { post } from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
    }
}

export const receiveLogin = () => {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        //user,
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

function logout() {
    return {
        type: LOGIN_LOGOUT,
        isFetching: false,
        isAuthenticated: false,
        user: null,
    }
}

export const loginUser = (username, password) => {
    return async (dispatch) => {
        dispatch(requestLogin());

        let login;
        try {
            login = await post('/login', { "username":username, "password":password });
        } catch (e) {
            return dispatch(loginError(e))
        }

        if (login.data.error) {
            dispatch(loginError(login.data.error))
        }

        if (login.status === 200) {
            const { token } = login.data;
            // SKIPTA ÞESSU ÚT SEINNA; EKKI GEYMA USER HÉR HELDUR SÆKJUM HANN EF VIÐ HÖFUM TOKEN
            window.localStorage.setItem('token', token);
            //window.localStorage.setItem('user', JSON.stringify(user))
            dispatch(receiveLogin());
        }
    }
}

export const logoutUser = () => {
    console.log('logging out');
    return async (dispatch) => {
      window.localStorage.removeItem('token');
      //window.localStorage.removeItem('user');
      dispatch(logout());
    }
  }
