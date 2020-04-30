import React from 'react';

import './MtSelectPosition.scss';
import { setMyTeam } from '../../actions/players';

export default function MtSelectPosition(props) {
    const { myTeamProps, dispatch } = props;
    const { myTeam, myPlayer } = myTeamProps
    const { formation } = myTeam;

    const addToTeam = () => {
        const pos = document.querySelector('.positionSelect').value;
        myTeam[pos] = {
            player_id: myPlayer.player_id,
            player_name: myPlayer.player_name
        }
        dispatch(setMyTeam(myTeam));
    }

    const allPos = formation.gk
                    .concat(formation.def)
                    .concat(formation.mid)
                    .concat(formation.att);

    return (
        <div className='confirmPlayer'>
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