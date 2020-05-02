import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import './MyTeam.scss';

import { setMyPlayer, setMyTeam, fetchTeams, fetchPlayers } from '../../actions/players';

import MtPlayerSearch from '../../components/mtPlayerSearch/MtPlayerSearch';
import DisplayTeam from '../../components/displayTeam/DisplayTeam';
import MtSelectPosition from '../../components/mtSelectPosition/MtSelectPosition';

function MyTeam(props) {
    const { myTeamProps, teamProps, playerProps, dispatch } = props;
   
   useEffect(() => {
        if(teamProps.teams.length === 0)
            dispatch(fetchTeams());
        else
            dispatch(fetchPlayers(teamProps.teams[0].teams[0].team_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamProps.teams]);

    const teamSetter = (team) => dispatch(setMyTeam(team));
    const squadFetcher = (id) => dispatch(fetchPlayers(id));
    const playerSetter = (player) => dispatch(setMyPlayer(player));

    return (
        <div className='myTeam'>
            <Helmet title="My Team" />
            <div className='displayTeam'>
                <DisplayTeam myTeam={myTeamProps.myTeam} teamSetter={teamSetter} playerSetter={playerSetter} />
                <MtPlayerSearch teamProps={teamProps} playerProps={playerProps} squadFetcher={squadFetcher} playerSetter={playerSetter} />
            </div>
            <div className='selectedPlayer'>
                {myTeamProps.myPlayer.player_id && <MtSelectPosition myTeamProps={myTeamProps} teamSetter={teamSetter} playerSetter={playerSetter}/>}
            </div>
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
