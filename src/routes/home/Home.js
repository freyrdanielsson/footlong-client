import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { fetchLeagues, fetchFixtureDetails } from '../../actions/fixtures';

import League from '../../components/league/League';
import FixtureDetails from '../../components/fixtureDetails/FixtureDetails';

import './Home.scss';


export function Home(props) {
    const { leaguesProps, fixtureProps, dispatch } = props
    const parsedQuery = queryString.parse(props.location.search);
    const today = new Date();
    const date = parsedQuery.date || today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    useEffect(() => {
        dispatch(fetchLeagues(date));
    }, [dispatch, date]);

    if (leaguesProps.loading) {
        return (
            <div>
                <p>1 sec pls</p>
            </div>
        )
    }

    if (leaguesProps.error) {
        return (
            <div>
                <p>{leaguesProps.error}</p>
            </div>
        )
    }

    const selectFixture = (fixture) => {
        dispatch(fetchFixtureDetails(fixture));
    }

    const closeFixtures = () => {
        dispatch(fetchFixtureDetails(null));
    }

    return (
        <div className='home'>
            <div className='leagues'>
                {leaguesProps.leagues && leaguesProps.leagues.map(league => {
                    return <League
                        key={league.title}
                        title={league.title}
                        fixtures={league.data.fixtures}
                        selectFixture={selectFixture} />
                })}
            </div>
            {<FixtureDetails fixtureProps={fixtureProps} onClose={closeFixtures} />}
        </div>
    )
}

const mapStateToProps = (state) => {
    const { fixtures } = state;
    const leaguesProps = {
        leagues: fixtures.leagues,
        error: fixtures.leagues_error,
        isFetching: fixtures.leagues_isFetching,
    }

    const fixtureProps = {
        fixture: fixtures.fixture,
        fixture_details: fixtures.fixture_details,
        error: fixtures.fixture_error,
        isFetching: fixtures.fixture_isFetching
    }
    return {
        leaguesProps,
        fixtureProps,
    }
}

export default withRouter(connect(mapStateToProps)(Home));
