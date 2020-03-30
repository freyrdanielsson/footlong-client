import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <main className='main'>
                <Helmet defaultTitle='Footlong' titleTemplate='%s - Footlong'></Helmet>
                <div className='main__content'>
                    <Switch location={this.props.location}>
                        {/* Add routes */}
                    </Switch>
                </div>
            </main>
        )
    }
}

export default withRouter(App);
