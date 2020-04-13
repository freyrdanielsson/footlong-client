import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import RegisterForm from '../../components/registerForm/RegisterForm';

function Register(props) {

    return (
        <div>
            <Helmet title="Register" />
            <RegisterForm {...props} />

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