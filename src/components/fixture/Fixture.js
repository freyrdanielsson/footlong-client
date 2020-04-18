import React from 'react';

import './Fixture.scss';

export default function Fixture(props) {
    const { homeTeam, awayTeam, statusShort, goalsHomeTeam, goalsAwayTeam } = props.fixture;

    return (
        <div className='fixture'>
            <div className='fixture__home'>
                <p>{homeTeam.team_name}</p>
            </div>

            <div className='fixture__info'>
                <div className='fixture__logo'>
                    <img className='fixture__home__logo' src={homeTeam.logo} alt={homeTeam.team_name} />
                </div>

                <div className='fixture__status'>
                    {statusShort === 'FT' && <p>
                        {`${goalsHomeTeam} - ${goalsAwayTeam}`}
                    </p>}
                    <p className='fixture__short-status'>{statusShort}</p>
                </div>

                <div className='fixture__logo'>
                    <img className='fixture__away__logo' src={awayTeam.logo} alt={awayTeam.team_name} />
                </div>
            </div>

            <div className='fixture__away'>
                <p>{awayTeam.team_name}</p>
            </div>
        </div>
    );
}