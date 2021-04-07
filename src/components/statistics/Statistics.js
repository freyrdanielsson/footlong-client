import React from 'react';

import './Statistics.scss';

export default function Statistics(props) {
    const { fixture_stats } = props;
    const statistics = fixture_stats?.data?.statistics ?? {};

    const ratio = (stat, team) => {
        const home = parseInt(stat.home);
        const away = parseInt(stat.away);

        if (isNaN(home) || isNaN(away)) {
            return '50%';
        }

        return team === 'home'
            ? `${home / (home + away) * 100}%`
            : `${away / (home + away) * 100}%`
    }

    return (
        <div className='statistics'>
            <h2 className='statistics__title'>Match stats</h2>
            {Object.keys(statistics).map(stat => {
                return (
                    <div key={stat} className='statistics__stat'>
                        <div className='statistics__header'>
                            <p>{statistics[stat].home || 0}</p>
                            <h3 className='statistics__heading'>{stat}</h3>
                            <p>{statistics[stat].away || 0}</p>
                        </div>

                        <div className='statistics__chart'>
                            <div className='statistics__bar statistics__bar--home'
                                style={{ width: ratio(statistics[stat], 'home'), }}
                            />
                            <div className='statistics__bar statistics__bar--away'
                                style={{ width: ratio(statistics[stat], 'away'), }}
                            />
                        </div>
                    </div>
                )
            })}

        </div>
    );
}