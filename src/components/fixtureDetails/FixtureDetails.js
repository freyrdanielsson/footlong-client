import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { variants, transition } from './animations';

import Fixture from '../fixture/Fixture';
import Events from '../events/Events';

import './FixtureDetails.scss';

export default function FixtureDetails(props) {
    const { onClose } = props;
    const { fixture, fixture_events, error, isFetching } = props.fixtureProps;
    console.log('[FIXTURE]', fixture);
    console.log('[ERROR]', error);
    console.log('[LOADING', isFetching);

    const teamSide = (teamName) => {
        return (teamName === fixture.homeTeam.team_name)
            ? 'home'
            : 'away'
    }

    return (
        <AnimatePresence>
            {fixture && <motion.div
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
                {!isFetching && <Events teamSide={teamSide} fixture_events={fixture_events}/>}
            </motion.div>}
        </AnimatePresence>
    );
}