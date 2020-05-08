import React from 'react';

import './MtSelectPosition.scss';
import { getAllPositions } from '../../utils/formations';

export default function MtSelectPosition(props) {
    const { team, player, teamSetter, playerSetter } = props;
    const { lineup } = team;

    const allPos = getAllPositions(lineup.formation);
    
    const addToTeam = () => {
        const pos = document.querySelector('.positionSelect').value;

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
        }

        team.lineup = lineup;
        teamSetter(team);
        playerSetter({});
    }


    return (
        <React.Fragment>
            {player.player_id &&
                <div className='player' >
                    <p>Name: {player.player_name}</p>
                    <p>Age: {player.age}</p>
                    <p>Nationality: {player.nationality}</p>
                    <p>Position: {player.position}</p>
                    <select className='positionSelect'>
                        {allPos.map( k => <option key={k} value={k}>{k}</option>)}
                    </select>
                    <button onClick={() => addToTeam()}>Add to Team</button>
                </div>
            }
        </React.Fragment>
    )
}