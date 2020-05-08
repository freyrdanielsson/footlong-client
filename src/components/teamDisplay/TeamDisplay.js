import React from 'react';


import './TeamDisplay.scss';

export default function TeamDisplay(props) {
    const { idTeam, isFetching, error } = props;

    if (isFetching) {
        return (
            <div className='pitch__noTeam'>
                <p>Fetching team...</p>
                <div className='pitch'></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='pitch__noTeam'>
                <p>Could not fetch team</p>
                <div className='pitch'></div>
            </div>
        )
    }

    const PositionFormation = (props) => {
        const { pos } = props;
        const { formation, team } = idTeam.lineup;

        return (
            <div className='pitch__line'>
                {formation[pos].map( k => { 
                    const playerName = team[k].player_name ? team[k].player_name : k;
                    const playerTeam = team[k].team ? team[k].team : '';
                    return <p key={k} id={k} className='pitch__player'>{`${playerName} ${playerTeam}`}</p>            
                })}
            </div>
        )
    }

    
    return (
        <div className='pitch'>
            <PositionFormation pos='gk' />
            <PositionFormation pos='def' />
            <PositionFormation pos='mid' />
            <PositionFormation pos='att' />
        </div>
    )
}