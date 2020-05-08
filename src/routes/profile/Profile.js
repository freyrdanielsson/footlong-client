import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { fetchCustomTeams } from '../../actions/teams';
import { createTeam } from '../../actions/team';
import { updateUser, uploadError } from '../../actions/auth';

import CreateTeam from '../../components/createTeam/CreateTeam';
import ListTeams from '../../components/listTeams/ListTeams';
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

    return (
        <div className='profile'>
            <Helmet title='Teams' />
            <ListTeams customTeamProps={customTeamProps} />

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

            {userProps.message &&
                <p>{userProps.message[0].message}</p>
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
