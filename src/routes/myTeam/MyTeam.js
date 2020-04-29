import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import MtPlayerSearch from '../../components/mtPlayerSearch/MtPlayerSearch';

function MyTeam(props) {
    return (
        <div>
            <Helmet title="My Team" />
            <MtPlayerSearch {...props} />
        </div>
    )
}

const mapStateToProps = (state) => {
    const { players } = state;
    const teamProps = {
        teams: players.teams,
        error: players.teams_error,
        isFetching: players.teams_isFetching,
    };

    const playerProps = {
        players: players.players,
        error: players.players_error,
        isFetching: players.players_isFetching,
    };

    return {
        teamProps,
        playerProps,
    }
}

export default withRouter(connect(mapStateToProps)(MyTeam))
