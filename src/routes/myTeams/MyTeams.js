import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './MyTeams.scss';


import { fetchCustomTeams } from '../../actions/teams';
import { setMyPlayer, setMyTeam, fetchTeams, fetchPlayers } from '../../actions/players';
import ListTeams from '../../components/listTeams/ListTeams';
import MtPlayerSearch from '../../components/mtPlayerSearch/MtPlayerSearch';
import DisplayTeam from '../../components/displayTeam/DisplayTeam';
import MtSelectPosition from '../../components/mtSelectPosition/MtSelectPosition';


function MyTeams(props) {
    const { myTeamProps, playerProps, teamProps, customTeamProps, dispatch } = props;

    useEffect(() => {
        dispatch(fetchCustomTeams('/custom-teams/my-teams/me'));
    }, [dispatch]);

    useEffect(() => {
        if(teamProps.teams.length === 0)
            dispatch(fetchTeams());
        else
            dispatch(fetchPlayers(teamProps.teams[0].teams[0].team_id));
    }, [dispatch, teamProps.teams]);

    const teamSetter = (team) => dispatch(setMyTeam(team));
    const squadFetcher = (id) => dispatch(fetchPlayers(id));
    const playerSetter = (player) => dispatch(setMyPlayer(player));

    return (
        <div>
            <Helmet title="Teams" />
            <div className='myTeam'>
                <div className='displayTeam'>
                    <DisplayTeam myTeam={myTeamProps.myTeam} teamSetter={teamSetter} playerSetter={playerSetter} />
                    <MtPlayerSearch teamProps={teamProps} playerProps={playerProps} squadFetcher={squadFetcher} playerSetter={playerSetter} />
                </div>
                <MtSelectPosition myTeamProps={myTeamProps} teamSetter={teamSetter} playerSetter={playerSetter}/>
            </div>
            <ListTeams customTeamProps={customTeamProps} />
        </div>
    )
}

const mapStateToProps = (state) => {
    const { teams, players } = state;
    const customTeamProps = {
        customTeams: teams.customTeams,
        error: teams.customTeams_error,
        isFetching: teams.customTeams_isFetching,
    };
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
        customTeamProps,
        teamProps,
        playerProps,
        myTeamProps,
    }
}

export default withRouter(connect(mapStateToProps)(MyTeams))
