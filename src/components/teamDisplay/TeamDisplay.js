import React from 'react';


import './TeamDisplay.scss';

export default function TeamDisplay(props) {
    const { idTeam, isFetching, error, playerSetter } = props;

    if (isFetching) {
        return (
            <div className='pitch__noTeam'>
                <p>Fetching team...</p>
                <div className='pitch'></div>
            </div>
        )
    }

    if (error) {
        const msg = typeof error === 'string' ? error : 'Error fetching team';
        return (
            <div className='pitch__noTeam'>
                <p>{msg}</p>
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
                    if (playerSetter) {
                        return <p onClick={ () => playerSetter(team[k])} key={k} id={k} className='pitch__player'>{playerName}</p> 
                    }
                    return <p key={k} id={k} className='pitch__player'>{playerName}</p>            
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