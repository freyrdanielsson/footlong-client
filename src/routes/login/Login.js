import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import LoginForm from '../../components/loginForm/LoginForm';
import { loginUser } from '../../actions/auth';

function Login(props) {
    const { dispatch, isFetching, message } = props;

    const postUser = async (e, username, password) => {
        e.preventDefault();
        dispatch(loginUser(username, password));
    }

    return (
        <div>
            <Helmet title="Login" />
            <LoginForm isFetching={isFetching} message={message} postUser={postUser} />

            <Link to='/register'>Register</Link>
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