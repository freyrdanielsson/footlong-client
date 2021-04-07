import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { fetchLeagues, fetchFixtureDetails } from '../../actions/fixtures';

import League from '../../components/league/League';
import FixtureDetails from '../../components/fixtureDetails/FixtureDetails';
import DatePicker from '../../components/datePicker/DatePicker';

import './Home.scss';


export function Home(props) {
    const { leaguesProps, fixtureProps, dispatch } = props
    const parsedQuery = queryString.parse(props.location.search);
    const today = new Date();
    const [date, setDate] = useState(parsedQuery.date || `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);

    useEffect(() => {
        dispatch(fetchLeagues(date));
    }, [dispatch, date]);    

    if (leaguesProps.isFetching) {
        return (
            <div>
                <p>Fetching fixtures...</p>
            </div>
        )
    }

    if (leaguesProps.error) {
        const msg = typeof leaguesProps.error === 'string' ? leaguesProps.error : 'Error fetching matches';
        return (
            <div>
                <p>{msg}</p>
            </div>
        )
    }

    const selectFixture = (fixture) => {
        dispatch(fetchFixtureDetails(fixture));
    }

    const closeFixtures = () => {
        dispatch(fetchFixtureDetails(null));
    }

    const onDateChange = (date) => {
        const newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        setDate(newDate);

        props.history.push({
            pathname: '/',
            search: `?date=${newDate}`
        });
    }

    return (
        <React.Fragment>
            <DatePicker onChange={onDateChange} />
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

                <FixtureDetails fixtureProps={fixtureProps} onClose={closeFixtures} />
            </div>
        </React.Fragment>
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
        fixture_events: fixtures.fixture_events,
        fixture_stats: fixtures.fixture_stats,
        error: fixtures.fixture_error,
        isFetching: fixtures.fixture_isFetching
    }
    return {
        leaguesProps,
        fixtureProps,
    }
}

export default withRouter(connect(mapStateToProps)(Home));
