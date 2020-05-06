import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchTeamById, saveTeam, patchTeam, deleteTeam, setMyPlayer, setMyTeam } from '../../actions/team';
import { fetchTeams, fetchPlayers } from '../../actions/players';
import DisplayField from '../../components/displayField/DisplayField';
import EditableTeam from '../../components/editableTeam/EditableTeam';

function TeamById(props) {
    const { idTeamProps, playerProps, teamProps, dispatch } = props;
    const [ owner, setOwner ] = useState(false);
    
    const id = props.match.params.id;
    const user = JSON.parse(window.localStorage.getItem('user'));

    useEffect(() => {
        dispatch(fetchTeamById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if(owner) {
            if(teamProps.teams.length === 0)
                dispatch(fetchTeams());
            else
                dispatch(fetchPlayers(teamProps.teams[0].teams[0].team_id));
        }
    }, [dispatch, teamProps.teams, owner]);

    useEffect(() => {
        if(user && idTeamProps.fetchedTeam.length > 0) {
            setOwner(idTeamProps.fetchedTeam[0].owner_id === user.id);
        }
    }, [dispatch, idTeamProps.fetchedTeam, user]);
    
    if(idTeamProps.error) {
        return <p>{idTeamProps.error}</p>
    }
    
    if(idTeamProps.isFetching || idTeamProps.fetchedTeam.length === 0) {
        return <p>Fetching team...</p>
    }
    
    const teamSetter = (team) => dispatch(setMyTeam(team));
    const squadFetcher = (id) => dispatch(fetchPlayers(id));
    const playerSetter = (player) => dispatch(setMyPlayer(player));
    const teamSaver = (team) => dispatch(saveTeam(team));
    const teamPatcher = (id, team) => dispatch(patchTeam(id,team));
    const teamDelete = (id) => dispatch(deleteTeam(id)); 
    
    return (
        <div>
            {owner && 
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
                    id={id}
                />
            }
            {!owner && <DisplayField myTeam={idTeamProps.myTeam} playerSetter={playerSetter} />}
        </div>
    )
}

const mapStateToProps = (state) => {
    const { players, team } = state;

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
        fetchedTeam: team.fetchedTeam,
        myPlayer: team.myPlayer,
        myTeam: team.myTeam,
        error: team.idTeam_error,
        isFetching: team.idTeam_isFetching,
    }

    return {
        teamProps,
        playerProps,
        idTeamProps,
    }
}

export default withRouter(connect(mapStateToProps)(TeamById))
