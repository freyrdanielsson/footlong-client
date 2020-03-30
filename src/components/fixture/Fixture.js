import React from 'react';

import './Fixture.scss';

export default function Fixture(props) {
    const { home, away, start } = props.fixture;


    return (
        <li className='fixture'>
            <div className='fixture__home'>
                <p>{home}</p>
            </div>
            <div className='fixture__info'>
                <p>{start}</p>
            </div>
            <div className='fixture__away'>
                <p>{away}</p>
            </div>

        </li>
    );
}