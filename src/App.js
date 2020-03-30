import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/header/Header';

import Home from './routes/home/Home';
import Highlights from './routes/highlights/Highlights';

import './App.scss';


class App extends Component {
    render() {
        return (
            <Fragment>
                <Helmet defaultTitle='Footlong' titleTemplate='%s - Footlong' />
                <Header />

                <main className='app'>
                    <Switch location={this.props.location}>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/highlights' component={Highlights} />
                    </Switch>
                </main>
            </Fragment>

        )
    }
}

export default withRouter(App);
