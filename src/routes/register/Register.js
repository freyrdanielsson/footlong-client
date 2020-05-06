import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { registerUser, registerError } from '../../actions/register';
import RegisterForm from '../../components/registerForm/RegisterForm';

import './Register.scss';

function Register(props) {
    const { dispatch, isFetching, message, logginIn } = props;

    const registerDispatch = (email, uName, pass) => {
        dispatch(registerUser(email, uName, pass));
    }

    const updateMessages = (msg) => {
        dispatch(registerError(msg));
    }

    return (
        <div className='register'>
            <Helmet title='Register' />
            <RegisterForm isFetching={isFetching} message={message} logginIn={logginIn} registerDispatch={registerDispatch} registerError={updateMessages}/>

            <div className='register__login'>
                <p className='register__login__text'>Have an account?</p>
                <Link className='register__login__link' to='/login'>Login</Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.register.isFetching,
        message: state.register.message,
        logginIn: state.auth.isFetching,
    }
}

export default connect(mapStateToProps)(Register);