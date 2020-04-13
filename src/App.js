import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/header/Header';
import UserRoute from './components/userRoute/UserRoute';


import Home from './routes/home/Home';
import Highlights from './routes/highlights/Highlights';
import Login from './routes/login/Login';

import './App.scss';


class App extends Component {
    render() {
        const { isAuthenticated, dispatch } = this.props;
        return (
            <Fragment>
                <Helmet defaultTitle='Footlong' titleTemplate='%s - Footlong' />
                <Header isAuth={isAuthenticated} dispatch={dispatch}/>

                <main className='app'>
                    <Switch location={this.props.location}>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/highlights' component={Highlights} />
                        <UserRoute path="/login" authenticated={!isAuthenticated} redirect="/profile" component={Login} />
                    </Switch>
                </main>
            </Fragment>

        )
    }
}

const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    }
  }

export default withRouter(connect(mapStateToProps)(App));
