import React from 'react';


import './TeamDisplay.scss';

export default function TeamDisplay(props) {
    const { idTeam, isFetching, error } = props.myTeam;

    if (isFetching) {
        return <div className='pitch'></div>
    }

    if (error) {
        return <p>Could not fetch team</p>
    }

    const PositionFormation = (props) => {
        const { pos } = props;
        const lineup = JSON.parse(idTeam[0].lineup);    
        const { formation, team } = lineup;

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