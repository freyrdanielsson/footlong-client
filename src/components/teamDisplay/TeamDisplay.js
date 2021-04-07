import React from 'react';


import './TeamDisplay.scss';

export default function TeamDisplay(props) {
    const { idTeam, isFetching, error, playerSetter } = props;

    if (isFetching) {
        return (
            <div className='pitch__noTeam'>
                <p>Fetching team...</p>
                <div className='pitch'>
                    <div className='pitch__protection'></div>
                </div>
            </div>
        )
    }
    
    if (error) {
        const msg = typeof error === 'string' ? error : 'Error fetching team';
        return (
            <div className='pitch__noTeam'>
                <p>{msg}</p>
                <div className='pitch'>
                    <div className='pitch__protection'></div>
                </div>
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
                        return (
                            <div key={k} className='pitch__obj'>
                                <div className='pitch__circle'>
                                    <img alt='' className='pitch__logo' src={team[k].logo}></img>
                                </div>
                                <h5 
                                    onClick={ () => playerSetter(team[k])} 
                                    id={k} 
                                    className='pitch__player'>
                                    {playerName.toUpperCase()}
                                </h5>
                            </div>
                        ) 
                    }
                    return (
                        <div key={k} className='pitch__obj'>
                            <div className='pitch__circle'>
                                <img alt='' className='pitch__logo' src={team[k].logo}></img>
                            </div>
                            <h5 id={k} className='pitch__player'>{playerName.toUpperCase()}</h5>  
                        </div> 
                    )         
                })}
            </div>
        )
    }

    
    return (
        <div className='pitch'>
            <div className='pitch__protection'>
                <PositionFormation pos='gk' />
                <PositionFormation pos='def' />
                <PositionFormation pos='mid' />
                <PositionFormation pos='att' />
            </div>
        </div>
    )
}