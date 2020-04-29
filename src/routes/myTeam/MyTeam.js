import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import MtPlayerSearch from '../../components/mtPlayerSearch/MtPlayerSearch';
import DisplayTeam from '../../components/displayTeam/DisplayTeam'

function MyTeam(props) {
    // <MtPlayerSearch {...props} />
    return (
        <div>
            <Helmet title="My Team" />
            <DisplayTeam />
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
