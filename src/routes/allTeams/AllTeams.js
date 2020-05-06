import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { fetchCustomTeams } from '../../actions/teams';
import ListTeams from '../../components/listTeams/ListTeams';

function AllTeams(props) {
    const { dispatch, customTeamProps } = props;

    useEffect(() => {
        dispatch(fetchCustomTeams('/custom-teams'));
    }, [dispatch]);

    return (
        <div className='allTeams'>
            <Helmet title="Teams" />
            <ListTeams customTeamProps={customTeamProps} all={true} />
        </div>
    )
}

const mapStateToProps = (state) => {
    const { teams } = state;
    const customTeamProps = {
        customTeams: teams.customTeams,
        error: teams.customTeams_error,
        isFetching: teams.customTeams_isFetching,
    };

    return {
        customTeamProps,
    }
}

export default withRouter(connect(mapStateToProps)(AllTeams))
