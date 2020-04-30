import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import MtPlayerSearch from '../../components/mtPlayerSearch/MtPlayerSearch';
import DisplayTeam from '../../components/displayTeam/DisplayTeam';
import MtSelectPosition from '../../components/mtSelectPosition/MtSelectPosition';

function MyTeam(props) {
    const { myTeamProps, dispatch } = props;
    return (
        <div>
            <Helmet title="My Team" />
            <DisplayTeam {...props} />
            <MtPlayerSearch {...props} />
            {Object.keys(myTeamProps.myPlayer).length > 0 && 
                <MtSelectPosition myTeamProps={myTeamProps} dispatch={dispatch}/>
            }
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

    const myTeamProps = {
        myTeam: players.myTeam,
        myPlayer: players.myPlayer,
    }

    return {
        teamProps,
        playerProps,
        myTeamProps
    }
}

export default withRouter(connect(mapStateToProps)(MyTeam))
