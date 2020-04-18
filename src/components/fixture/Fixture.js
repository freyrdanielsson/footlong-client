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
                <div className='fixture__logo'>
                    <img className='fixture__home__logo' src={homeTeam.logo} alt={homeTeam.team_name} />
                </div>
                <p className='fixture__status'>{status}</p>
                <div className='fixture__logo'>
                    <img className='fixture__away__logo' src={awayTeam.logo} alt={awayTeam.team_name} />
                </div>
            </div>

            <div className='fixture__away'>

                <p>{awayTeam.team_name}</p>
            </div>

        </li>
    );
}