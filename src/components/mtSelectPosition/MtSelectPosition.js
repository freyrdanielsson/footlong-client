import React from 'react';

import './MtSelectPosition.scss';
import { getAllPositions } from '../../utils/formations';

export default function MtSelectPosition(props) {
    const { myTeamProps, teamSetter, playerSetter } = props;
    const { myTeam, myPlayer } = myTeamProps
    const { formation } = myTeam;

    const toDisplay = myPlayer.player_id ? {} : {display: 'none'};
    
    const allPos = getAllPositions(formation);

    const addToTeam = () => {
        const pos = document.querySelector('.positionSelect').value;

        // Trying to put player again in same position 
        if (myTeam.team[pos].player_id === myPlayer.player_id) {
            playerSetter({});
            return;
        }

        // Check if player is already in team - Then remove 
        for (let i=0; i<allPos.length; i += 1) {
            if (myTeam.team[allPos[i]].player_id === myPlayer.player_id ) {
                myTeam.team[allPos[i]] = {};
            }
        }

        const sel = document.getElementById('Teams');
        const realTeam = sel.options[sel.selectedIndex].text;

        myTeam.team[pos] = {
            player_id: myPlayer.player_id,
            player_name: myPlayer.player_name,
            age: myPlayer.age,
            nationality: myPlayer.nationality,
            position: myPlayer.position,
            team: realTeam,
        }

        teamSetter(myTeam);
        playerSetter({});
    }


    return (
        <div className='confirmPlayer' style={toDisplay}>
            <p>Name: {myPlayer.player_name}</p>
            <p>Age: {myPlayer.age}</p>
            <p>Nationality: {myPlayer.nationality}</p>
            <p>Position: {myPlayer.position}</p>
            <select className='positionSelect'>
                {allPos.map( k => <option key={k} value={k}>{k}</option>)}
            </select>
            <button onClick={() => addToTeam()}>Add to Team</button>
        </div>
    )
}