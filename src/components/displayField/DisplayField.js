import React from 'react';

import './DisplayField.scss';

export default function DisplayField(props) {
    const { myTeam, playerSetter } = props;

    const PositionFormation = (props) => {
        const { pos } = props;
        const { formation, team } = myTeam;

        return (
            <div className='playerPosition'>
                {formation[pos].map( k => { 
                    const playerName = team[k].player_name ? team[k].player_name : k;
                    const playerTeam = team[k].team ? team[k].team : '';
                    const playerLabel = `${playerName} ${playerTeam}`
                    if( playerSetter )
                        return <p onClick={ () => playerSetter(team[k])} key={k} id={k} className='player'>{playerLabel}</p> 
                        
                    return <p key={k} id={k} className='player'>{playerLabel}</p>            
                })}
            </div>
        )
    }

    return (
        <div className='field'>
            <PositionFormation pos='gk' />
            <PositionFormation pos='def' />
            <PositionFormation pos='mid' />
            <PositionFormation pos='att' />
        </div>
    )
}