import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/header/Header';
import UserRoute from './components/userRoute/UserRoute';

import Home from './routes/home/Home';
import Highlights from './routes/highlights/Highlights';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import AllTeams from './routes/allTeams/AllTeams';
import Profile from './routes/profile/Profile';
import TeamById from './routes/teamById/TeamById';

import './App.scss';


function App(props) {
    const { isAuthenticated, dispatch, location } = props;

    return (
        <Fragment>
            <Helmet defaultTitle='Footlong' titleTemplate='%s - Footlong' />
            <Header isAuth={isAuthenticated} dispatch={dispatch} />

            <main className='app'>
                <Switch location={location}>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/highlights' component={Highlights} />
                    <Route exact path='/teams' component={AllTeams} />
                    <Route exact path='/teams/:id' component={TeamById} />
                    <UserRoute path='/profile' authenticated={isAuthenticated} redirect='/login' component={Profile} />
                    <UserRoute path='/login' authenticated={!isAuthenticated} redirect='/profile' component={Login} />
                    <UserRoute path='/register' authenticated={!isAuthenticated} redirect='/profile' component={Register} />
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
