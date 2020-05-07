import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { fetchCustomTeams } from '../../actions/teams';
import { saveTeam, setMyTeam } from '../../actions/team';

import ListTeams from '../../components/listTeams/ListTeams';

import './Profile.scss';

function Profile(props) {
    const { customTeamProps, dispatch } = props;

    useEffect(() => {
        dispatch(fetchCustomTeams('/custom-teams/my-teams/me'));
    }, [dispatch]);


    const teamSetter = (team) => dispatch(setMyTeam(team));
    const teamSaver = (team) => dispatch(saveTeam(team));

    return (
        <div className='profile'>
            <Helmet title='Teams' />
            <ListTeams customTeamProps={customTeamProps} />

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        customTeamProps: {
            customTeams: state.teams.customTeams,
            error: state.teams.customTeams_error,
            isFetching: state.teams.customTeams_isFetching,
        }
    }
}

export default withRouter(connect(mapStateToProps)(Profile))
