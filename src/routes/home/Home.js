import React from 'react';

import League from '../../components/league/League';

export default function Home() {
    const mock = [
        {
            title: 'Premier League',
            fixtures: [
                {
                    home: 'Arsenal',
                    away: 'Chelsea',
                    start: '19:00'
                },
                {
                    home: 'Manchester United',
                    away: 'Some team with very very very long name',
                    start: '19:00'
                },
                {
                    home: 'Liverpool',
                    away: 'Atletico Madrid',
                    start: '19:00'
                },
                {
                    home: 'Chelsea',
                    away: 'Manchester United',
                    start: '19:00'
                },
            ]
        }
    ]
    return (
        <div>
            {mock.map(league => {
                return <League key={league.title} title={league.title} fixtures={league.fixtures} />
            })}
        </div>
    )
}