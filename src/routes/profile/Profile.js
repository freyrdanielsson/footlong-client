import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { fetchCustomTeams } from '../../actions/teams';
import { createTeam } from '../../actions/team';

import ListTeams from '../../components/listTeams/ListTeams';
import UpdateForm from '../../components/profileUpdateForm/ProfileUpdateForm';

import './Profile.scss';

function Profile(props) {
    const { customTeamProps, dispatch, user } = props;

    useEffect(() => {
        dispatch(fetchCustomTeams('/custom-teams/my-teams/me'));
    }, [dispatch]);

    const submitUpdate = (username, email) => {
        // TODO: dispatch action to patch on server
    }

    return (
        <div className='profile'>
            <Helmet title='Teams' />
            <ListTeams customTeamProps={customTeamProps} />
            <UpdateForm user={user} submitUpdate={submitUpdate}/>


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
        user: state.auth.user,
    }
}

export default withRouter(connect(mapStateToProps)(Profile))
