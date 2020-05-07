import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './Profile.scss';
import { fetchCustomTeams } from '../../actions/teams';
import { saveTeam, patchTeam, deleteTeam, setMyPlayer, setMyTeam } from '../../actions/team';
import { fetchTeams, fetchPlayers } from '../../actions/players';
import ListTeams from '../../components/listTeams/ListTeams';
import EditableTeam from '../../components/editableTeam/EditableTeam';

function Profile(props) {
    const { idTeamProps, playerProps, teamProps, customTeamProps, dispatch } = props;

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
    const teamSaver = (team) => dispatch(saveTeam(team));
    const teamPatcher = (id, team) => dispatch(patchTeam(id,team));
    const teamDelete = (id) => dispatch(deleteTeam(id)); 

    return (
        <div>
            <Helmet title="Teams" />
            <ListTeams customTeamProps={customTeamProps} />
            <EditableTeam 
                idTeamProps={idTeamProps}
                teamProps={teamProps}
                playerProps={playerProps}
                teamSetter={teamSetter}
                playerSetter={playerSetter}
                squadFetcher={squadFetcher}
                teamSaver={teamSaver}
                teamPatcher={teamPatcher}
                teamDelete={teamDelete}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    const { teams, players, team } = state;
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

    const idTeamProps = {
        myPlayer: team.myPlayer,
        myTeam: team.myTeam,
        isSaving: team.save_isSaving,
        saveError: team.save_error,
        saveSucc: team.save_success,
    }

    return {
        customTeamProps,
        teamProps,
        playerProps,
        idTeamProps,
    }
}

export default withRouter(connect(mapStateToProps)(Profile))
