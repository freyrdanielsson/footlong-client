import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchTeamById } from '../../actions/team';
import { setMyPlayer, setMyTeam, fetchTeams, fetchPlayers } from '../../actions/players';
import DisplayField from '../../components/displayField/DisplayField';
import EditableTeam from '../../components/editableTeam/EditableTeam';

function TeamById(props) {
    const { idTeamProps, myTeamProps, playerProps, teamProps, dispatch } = props;
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
        if(idTeamProps.team.length > 0)
            setOwner(idTeamProps.team[0].owner_id === user.id);
    }, [dispatch, idTeamProps.team, user.id]);
    
    if(idTeamProps.error) {
        return <p>{idTeamProps.error}</p>
    }
    
    if(idTeamProps.isFetching || idTeamProps.team.length === 0) {
        return <p>Fetching team...</p>
    }
    
    const teamSetter = (team) => dispatch(setMyTeam(team));
    const squadFetcher = (id) => dispatch(fetchPlayers(id));
    const playerSetter = (player) => dispatch(setMyPlayer(player));
    
    return (
        <div>
            {owner && 
                <EditableTeam 
                    myTeamProps={myTeamProps}
                    teamProps={teamProps}
                    playerProps={playerProps}
                    teamSetter={teamSetter}
                    playerSetter={playerSetter}
                    squadFetcher={squadFetcher}
                />
            }
            {!owner && <DisplayField myTeam={myTeamProps.myTeam} playerSetter={playerSetter} />}
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

    const myTeamProps = {
        myTeam: players.myTeam,
        myPlayer: players.myPlayer,
    }

    const idTeamProps = {
        team: team.idTeam,
        error: team.idTeam_error,
        isFetching: team.idTeam_isFetching,
    }

    return {
        teamProps,
        playerProps,
        myTeamProps,
        idTeamProps,
    }
}

export default withRouter(connect(mapStateToProps)(TeamById))
