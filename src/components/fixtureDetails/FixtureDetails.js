import React from 'react';
import { motion } from 'framer-motion';

import { variants, transition } from './animations';

import Fixture from '../fixture/Fixture';
import Events from '../events/Events';
import Statistics from '../statistics/Statistics';

import './FixtureDetails.scss';

export default function FixtureDetails(props) {
    const { onClose } = props;
    const { fixture, fixture_events, fixture_stats, error, isFetching } = props.fixtureProps;

    const teamSide = (teamName) => {
        return (teamName === fixture.homeTeam.team_name)
            ? 'home'
            : 'away'
    }

    return (
        <React.Fragment>
            {fixture &&
                <div className='fixtureDetails__wrapper'>
                    <motion.div
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={variants}
                        transition={transition}
                        className='fixtureDetails'>
                        <div className='fixtureDetails__header'>
                            <button className='fixtureDetails__close' onClick={onClose}>
                                <span>✕</span>
                            </button>
                            <Fixture fixture={fixture} />
                        </div>

                        {error && <p>Oops! Unable to get stats and events for this fixture</p>}
                        <div className='fixtureDetails__content'>
                            {!isFetching && !error && <Events teamSide={teamSide} fixture_events={fixture_events} />}
                            {!isFetching && !error && <Statistics fixture_stats={fixture_stats} />}
                        </div>
                    </motion.div>
                </div>}
        </React.Fragment>
    );
}