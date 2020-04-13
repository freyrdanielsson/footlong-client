import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import LoginForm from '../../components/loginForm/LoginForm';

function Login(props) {
    
    return ( 
        <div>
            <Helmet title="Login" />
            <LoginForm {...props} />

            <Link to='/register'>Register</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        message: state.auth.message,
        isFetchingProfile: state.auth.isFetchingProfile,
    }
}

export default connect(mapStateToProps)(Login);