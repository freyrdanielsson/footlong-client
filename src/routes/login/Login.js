import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import LoginForm from '../../components/loginForm/LoginForm';
import { loginUser } from '../../actions/auth';

import './Login.scss';

function Login(props) {
    const { dispatch, isFetching, message } = props;

    const postUser = async (username, password) => {
        dispatch(loginUser(username, password));
    }

    return (
        <div className='login'>
            <Helmet title='Login' />
            <LoginForm isFetching={isFetching} message={message} postUser={postUser} />

            <div className='login__register'>
                <p className='login__register__text'>No account?</p>
                <Link className='login__register__link' to='/register'>Register</Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        message: state.auth.message,
    }
}

export default connect(mapStateToProps)(Login);