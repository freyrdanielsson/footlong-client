import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import LoginForm from '../../components/loginForm/LoginForm';

function Login(props) {
    
    return ( 
        <div>
            <Helmet title="Login" />
            <LoginForm {...props} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        message: state.auth.message
    }
}

export default connect(mapStateToProps)(Login);