import React from 'react';

import './MtSelectPosition.scss';
import { getAllPositions } from '../../utils/formations';

export default function MtSelectPosition(props) {
    const { team, player, teamSetter, playerSetter, onClose } = props;
    const { lineup } = team;

    const allPos = getAllPositions(lineup.formation);
    
    const addToTeam = () => {
        const pos = document.querySelector('.player__select').value;

        // Trying to put player again in same position 
        if (lineup.team[pos].player_id === player.player_id) {
            playerSetter({});
            return;
        }

        // Check if player is already in team - Then remove 
        for (let i=0; i<allPos.length; i += 1) {
            if (lineup.team[allPos[i]].player_id === player.player_id ) {
                lineup.team[allPos[i]] = {};
            }
        }


        lineup.team[pos] = {
            player_id: player.player_id,
            player_name: player.player_name,
            age: player.age,
            nationality: player.nationality,
            position: player.position,
            logo: player.logo
        }

        team.lineup = lineup;
        teamSetter(team);
        playerSetter({});
    }

    return (
        <React.Fragment>
            {player.player_id &&
                <div className='player__wrapper'>
                    <div className='player' >
                        <div className='player__header'>
                            <div className='player__closeWrapper'>
                                <button className='player__close' onClick={onClose}>
                                        <span>✕</span>
                                </button>
                            </div>
                            <h3 className='player__title'>Select Position for Player</h3>
                        </div>
                        <div className='player__body'>
                            <div className='player__line'>
                                <div className='player__el'>
                                    <h5>Name: </h5>
                                    <p>{player.player_name}</p>
                                </div>
                                <div className='player__el'>
                                    <h5>Age: </h5>
                                    <p>{player.age}</p>
                                </div>
                            </div>
                            <div className='player__line'>
                                <div className='player__el'>
                                    <h5>Nationality: </h5>
                                    <p>{player.nationality}</p>
                                </div>
                                <div className='player__el'>
                                    <h5>Position: </h5>
                                    <p>{player.position}</p>
                                </div>
                            </div>
                        </div>
                        <div className='player__footer'>
                            <select className='player__select'>
                                {allPos.map( k => <option key={k} value={k}>{k}</option>)}
                            </select>
                            <button className='player__add' onClick={() => addToTeam()}>Add to Team</button>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}