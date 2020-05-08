import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './EditTeam.scss';

import { getAllPositions, formations } from '../../utils/formations';
import { fetchTeamById, patchTeam, deleteTeam, deleteRefresh, patchRefresh, saveRefresh } from '../../actions/team';
import { fetchTeams, fetchPlayers } from '../../actions/players';
import Select from '../../components/select/Select';
import TeamDisplay from '../../components/teamDisplay/TeamDisplay';
import MtPlayerSearch from '../../components/mtPlayerSearch/MtPlayerSearch';
import MtSelectPosition from '../../components/mtSelectPosition/MtSelectPosition';
import SaveTeam from '../../components/saveTeam/SaveTeam';

function EditTeam(props) {
    const { dispatch, teamProps, selectionProps, user } = props;
    const { idTeam, teamError, teamIsFetching } = teamProps;
    const id = props.match.params.id;
    const [ team, setTeam ] = useState(null);
    const [ teamChange, setChange ] = useState(false);
    const [ player, setPlayer ] = useState({});

    // First fetch team to edit then all real teams from leagues 
    useEffect(() => {
        dispatch(fetchTeamById(id));
        dispatch(fetchTeams());
    }, [dispatch, id]);

    // When all real teams from leagues are fetched, fetch first squad
    useEffect(() => {
        if (selectionProps.leagues.length > 0) 
            dispatch(fetchPlayers(selectionProps.leagues[0].teams[0].team_id))
    }, [dispatch, selectionProps.leagues]); 

    // When team to edit has been fetched save it to state
    useEffect(() => {
        if (idTeam !== null && isNaN(idTeam)) {
            setTeam(idTeam);
        }
    }, [idTeam]);

    // Check that authenticated user owns team he is requesting to use
    useEffect(() => {
        if (!user) {
            props.history.push({pathname: '/login'});
            return;
        }
        if (team) {
            if(team.owner_id === user.id) 
                return;
            
            props.history.push({pathname: '/login'});
        }
    }, [props.history, team, user]);

    if (teamIsFetching) {
        return <p>Fetching Team...</p>
    }

    if (teamError) {
        return <p>Error fetching team :( </p>
    }
    
    const handleDeleteTeam = (id) => dispatch(deleteTeam(id));
    const handleEditTeam = (id, team) => dispatch(patchTeam(id,team));
    const handleFetchSquad = (id) => dispatch(fetchPlayers(id));
    const handleFetchLeague = () => dispatch(fetchTeams());
    const handleChangeFormation = (val) => {
        const newLineup = formations[val];
        const { lineup } = team;
        const newPositions = getAllPositions(newLineup.formation);
        const oldPositions = getAllPositions(lineup.formation);
        for (let i=0; i<newPositions.length; i += 1) {
            if (lineup.team[oldPositions[i]].player_id) {
                newLineup.team[newPositions[i]] = lineup.team[oldPositions[i]];
            }
        }
        team.lineup = newLineup;
        setChange(!teamChange);
        setTeam(team);
    }

    const handleSetTeam = (team) => {
        setChange(!teamChange);
        setTeam(team);
    }

    const handleSuccess = () => {
        dispatch(deleteRefresh());
        dispatch(patchRefresh());
        dispatch(saveRefresh());
        props.history.push({pathname: '/profile'});
    }

    const editHandlers = {
        handleDeleteTeam,
        handleEditTeam,
        handleSuccess
    }

    const handlerProps = {
        handleFetchSquad,
        handleFetchLeague,
        setPlayer
    }

    return (
        <React.Fragment>
            <div className='edit-team'>
                {team &&
                    <div>
                        <div className='edit-team__viewSearch'>
                            <div className='edit-team__pitch'>
                                <Select 
                                    options={formations} 
                                    onClickFun={handleChangeFormation}
                                    label='Formation' 
                                    valueKey='value' 
                                    labelKey='label' 
                                />
                                <div className='edit-team__pitchWrapper'>
                                    <TeamDisplay idTeam={team} playerSetter={setPlayer}/>
                                </div>
                            </div>
                            <MtPlayerSearch 
                                selectionProps={selectionProps} 
                                handlers={handlerProps} 
                            />
                        </div>
                        <div className='edit-team__options'>
                            <SaveTeam 
                                teamProps={teamProps} 
                                handlers={editHandlers} 
                                team={team} 
                                user={user}
                            />
                            <MtSelectPosition 
                                team={team}
                                player={player}
                                teamSetter={handleSetTeam}
                                playerSetter={setPlayer}
                            />
                        </div>
                    </div>
  
                }
            </div>
        </React.Fragment>

    )
}

const mapStateToProps = (state) => {
    const { team, players, auth } = state;
    return {
        teamProps: {
            idTeam: team.fetchedTeam,
            teamError: team.idTeam_error,
            teamIsFetching: team.idTeam_isFetching,
            deleting: team.delete_isDeleting,
            delError: team.delete_error,
            delSuccess: team.delete_success,
            patching: team.patch_isSaving,
            patchError: team.patch_error,
            patchSuccess: team.patch_success
        },
        selectionProps: {
            leagues: players.teams,
            leaguesError: players.teams_error,
            leaguesIsFetching: players.teams_isFetching,
            squad: players.players,
            squadError: players.players_error,
            squadIsFetching: players.players_isFetching,
        },
        user: auth.user
    } 
}

export default withRouter(connect(mapStateToProps)(EditTeam))
