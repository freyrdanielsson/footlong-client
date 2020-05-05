import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { fetchCustomTeams } from '../../actions/teams';
import ListTeams from '../../components/listTeams/ListTeams';

function AllTeams(props) {
    const { customTeamProps, dispatch } = props;

    useEffect(() => {
        dispatch(fetchCustomTeams());
    }, [dispatch]);

    if (customTeamProps.isFetching) {
        return (
            <div>
                <p>Loading teams...</p>
            </div>
        )
    }

    if (customTeamProps.error) {
        return (
            <div>
                <p>{customTeamProps.error}</p>
            </div>
        )
    }

    return (
        <div className='allTeams'>
            <Helmet title="Teams" />
            <ListTeams teamList={customTeamProps.customTeams} />
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
