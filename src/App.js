import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/header/Header';
import UserRoute from './components/userRoute/UserRoute';

import Home from './routes/home/Home';
import Highlights from './routes/highlights/Highlights';
import Login from './routes/login/Login';
import Register from './routes/register/Register';

import { fetchUser } from './actions/auth';

import './App.scss';


function App(props) {
    const { isAuthenticated, dispatch, location } = props;
    const token = window.localStorage.getItem('token') || null;

    useEffect(() => {
        if (token && !isAuthenticated) dispatch(fetchUser(token));
    }, [dispatch, isAuthenticated, token]);

    return (
        <Fragment>
            <Helmet defaultTitle='Footlong' titleTemplate='%s - Footlong' />
            <Header isAuth={isAuthenticated} dispatch={dispatch} />

            <main className='app'>
                <Switch location={location}>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/highlights' component={Highlights} />
                    <UserRoute path="/login" authenticated={!isAuthenticated} redirect="/profile" component={Login} />
                    <UserRoute path="/register" authenticated={!isAuthenticated} redirect="/profile" component={Register} />
                </Switch>
            </main>
        </Fragment>

    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default withRouter(connect(mapStateToProps)(App));
