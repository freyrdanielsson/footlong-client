import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import { fetchCustomTeams } from '../../actions/teams';
import { fetchTeamById } from '../../actions/team';
import TeamList from '../../components/teamlist/TeamList';
import TeamDetails from '../../components/teamDetails/TeamDetails';

import './AllTeams.scss';


function AllTeams(props) {
    const { dispatch, teamListProps, idTeamProps } = props;
    
    useEffect(() => {
        const parsedQuery = queryString.parse(props.location.search);
        if (parsedQuery.id) {
            dispatch(fetchTeamById(parsedQuery.id))
        }
    }, [dispatch, props.location.search]);

    useEffect(() => {
        dispatch(fetchCustomTeams('/custom-teams'));
    }, [dispatch]);

    const handleTeamClick = (id) => {
        dispatch(fetchTeamById(id));
        props.history.push({
            pathname: '/teams',
            search: `?id=${id}`
        });
    }

    const handleEditTeamClick = (id) => {
        props.history.push({pathname: `/profile/edit/${id}`});
    }

    const handleCloseDetails = () => {
        dispatch(fetchTeamById(null));
        props.history.push({pathname: '/teams'});
    }

    return (
        <React.Fragment>
            <Helmet title='Teams'/>
            <div className='teamsHome'>
                <div className='teamsHome__listcontainer'>
                    <TeamList teamListProps={teamListProps} handler={handleTeamClick}/>
                </div>
                <TeamDetails 
                    idTeamProps={idTeamProps} 
                    onClose={handleCloseDetails} 
                    onEdit={handleEditTeamClick}/>
            </div>

        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    const { teams, team } = state;
    const teamListProps = {
        customTeams: teams.customTeams,
        error: teams.customTeams_error,
        isFetching: teams.customTeams_isFetching,
    };
    const idTeamProps = {
        idTeam: team.fetchedTeam,
        error: team.idTeam_error,
        isFetching: team.idTeam_isFetching,
    }

    return {
        teamListProps,
        idTeamProps
    }
}

export default withRouter(connect(mapStateToProps)(AllTeams))
