import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { fetchCustomTeams } from '../../actions/teams';
import { updateUser, uploadError, logoutUser } from '../../actions/auth';
import { createTeam, fetchTeamById } from '../../actions/team';

import CreateTeam from '../../components/createTeam/CreateTeam';
import TeamList from '../../components/teamlist/TeamList';
import UserDetail from '../../components/userDetail/UserDetail';
import UpdateForm from '../../components/profileUpdateForm/ProfileUpdateForm';

import './Profile.scss';

function Profile(props) {
    const { customTeamProps, dispatch, userProps, createTeamProps } = props;

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        dispatch(fetchCustomTeams('/custom-teams/my-teams/me'));
    }, [dispatch]);

    useEffect(() => {
        if (createTeamProps.isCreated) {
            props.history.push(`/profile/edit/${createTeamProps.id}`);
        }
    }, [createTeamProps, props.history]);


    const submitUpdate = (payload) => {
        dispatch(updateUser(payload));
        setEdit(false);
    }

    const onSubmit = (teamName) => {
        const team = {
            teamName,
            ownerId: userProps.user.id,
            ownerName: userProps.user.username,
        }
        dispatch(createTeam(team));
    }

    const onTeamClick = (id) => {
        dispatch(fetchTeamById(id));
        props.history.push({pathname: `/profile/edit/${id}`});
    }

    return (
        <div className='profile'>
            <Helmet title='Profile' />
            <TeamList teamListProps={customTeamProps} handler={onTeamClick} />

            {!createTeamProps.isCreating && <CreateTeam onSubmit={onSubmit} />}

            {createTeamProps.error && <p className='profile__error'>{createTeamProps.error}</p>}

            {createTeamProps.isCreating && <p>Creating team...</p>}

            {userProps.isFetching && <p>Updating profile...</p>}

            {!edit && !userProps.isFetching &&
                <UserDetail userProps={userProps} onEdit={() => setEdit(true)} />
            }

            {edit &&
                <UpdateForm userProps={userProps} submitUpdate={submitUpdate} uploadError={msg => dispatch(uploadError(msg))} onCancel={() => setEdit(false)} />
            }

            <button className='profile__button' onClick={() => dispatch(logoutUser())}>Logout</button>

            {userProps.message &&
                <p>{userProps.message.message}</p>
            }


        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        customTeamProps: {
            customTeams: state.teams.customTeams,
            error: state.teams.customTeams_error,
            isFetching: state.teams.customTeams_isFetching,
        },
        userProps: {
            user: state.auth.user,
            isFetching: state.auth.isFetching,
            message: state.auth.message,
        },
        createTeamProps: {
            isCreating: state.team.save_isSaving,
            isCreated: state.team.save_success,
            error: state.team.save_error,
            id: state.team.id,
        }
    }
}

export default withRouter(connect(mapStateToProps)(Profile))
