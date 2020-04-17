import React from 'react';

import './Fixture.scss';

export default function Fixture(props) {
    const { homeTeam, awayTeam, status } = props.fixture;


    return (
        <li className='fixture'>
            <div className='fixture__home'>
                <p>{homeTeam.team_name}</p>
            </div>
            <div className='fixture__info'>
                <p>{status}</p>
            </div>
            <div className='fixture__away'>
                <p>{awayTeam.team_name}</p>
            </div>

        </li>
    );
}