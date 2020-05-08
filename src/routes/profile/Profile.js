import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { fetchCustomTeams } from '../../actions/teams';
import { createTeam } from '../../actions/team';
import { updateUser, uploadError } from '../../actions/auth';

import ListTeams from '../../components/listTeams/ListTeams';
import UpdateForm from '../../components/profileUpdateForm/ProfileUpdateForm';

import './Profile.scss';

function Profile(props) {
    const { customTeamProps, dispatch, userProps } = props;
    

    useEffect(() => {
        dispatch(fetchCustomTeams('/custom-teams/my-teams/me'));
    }, [dispatch]);

    return (
        <div className='profile'>
            <Helmet title='Teams' />
            <ListTeams customTeamProps={customTeamProps} />
            
            <UpdateForm userProps={userProps} submitUpdate={payload => dispatch(updateUser(payload))} uploadError={msg => dispatch(uploadError(msg))} />


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
