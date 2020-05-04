import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { registerUser } from '../../actions/register';
import RegisterForm from '../../components/registerForm/RegisterForm';

function Register(props) {
    const { dispatch, isFetching, message } = props;

    const registerDispatch = (e, email, uName, pass) => {
        e.preventDefault();
        dispatch(registerUser(email, uName, pass));
    }

    return (
        <div>
            <Helmet title="Register" />
            <RegisterForm isFetching={isFetching} message={message} registerDispatch={registerDispatch} />

            <Link to='/login'>Login</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.register.isFetching,
        message: state.register.message,
    }
}

export default connect(mapStateToProps)(Register);