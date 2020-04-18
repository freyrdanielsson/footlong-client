import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { variants, transition } from './animations';

import Fixture from '../fixture/Fixture';

import './FixtureDetails.scss';

export default function FixtureDetails(props) {
    const { onClose } = props;
    const { fixture } = props.fixtureProps;
    console.log(fixture);


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
                <div className='fixtureDetails__details'>

                </div>
            </motion.div>}
        </AnimatePresence>
    );
}