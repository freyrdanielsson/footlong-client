import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { fetchCustomTeams } from '../../actions/teams';
import { createTeam } from '../../actions/team';
import { updateUser, uploadError } from '../../actions/auth';

import ListTeams from '../../components/listTeams/ListTeams';
import UserDetail from '../../components/userDetail/UserDetail';
import UpdateForm from '../../components/profileUpdateForm/ProfileUpdateForm';

import './Profile.scss';

function Profile(props) {
    const { customTeamProps, dispatch, userProps } = props;

    const [edit, setEdit] = useState(false);


    useEffect(() => {
        dispatch(fetchCustomTeams('/custom-teams/my-teams/me'));
    }, [dispatch]);

    const submitUpdate = (payload) => {
        dispatch(updateUser(payload));
        setEdit(false);
    }

    return (
        <div className='profile'>
            <Helmet title='Teams' />
            <ListTeams customTeamProps={customTeamProps} />

            {!edit &&
                <UserDetail userProps={userProps} onEdit={() => setEdit(true)} />
            }

            {edit &&
                <UpdateForm userProps={userProps} submitUpdate={submitUpdate} uploadError={msg => dispatch(uploadError(msg))} onCancel={() => setEdit(false)} />
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
        }
    }
}

export default withRouter(connect(mapStateToProps)(Profile))
