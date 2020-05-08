import React from 'react';
import { motion } from 'framer-motion';

import { fixtureAnimation, leagueAnimation } from './animations';

import Fixture from '../fixture/Fixture';

import './League.scss';

export default function League(props) {

    const { title, fixtures, selectFixture } = props

    return (
        <motion.div initial='hidden' animate='visible' variants={leagueAnimation} className='league'>
            <div className='league__header'>
                <h3 className='league__title'>{title}</h3>
                <div className={`league__logo league__logo--${title.replace(/\s+/g, '')}`} />
            </div>
            <motion.ul variants={fixtureAnimation} className='league__list'>
                {fixtures.length > 0 && fixtures.map((fixture, i) => {
                    return <li key={i} onClick={() => selectFixture(fixture)}>
                        <Fixture fixture={fixture} />
                    </li>
                })}

                {fixtures.length === 0 &&
                <p>Sorry, no games today.</p>
                }
            </motion.ul>
        </motion.div>
    );
}