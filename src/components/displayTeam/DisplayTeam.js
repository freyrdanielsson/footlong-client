import React from 'react';

import './DisplayTeam.scss';
import { setMyTeam } from '../../actions/players';

export default function DisplayTeam(props) {
    const { formations } = require('../../utils/formations');
    const { dispatch, myTeamProps } = props;
    const { myTeam } = myTeamProps;

    console.log(myTeam);

    const FieldFormation = (props) => {
        const { myTeam, pos } = props;
        return (
            <div className='playerPosition'>
                {myTeam.formation[pos].map( k => { 
                    const playerName = myTeam[k].player_name ? myTeam[k].player_name : ''; 
                    return <div key={k} id={k} className='player'>{playerName}</div> 
                })}
            </div>
        )
    }

    const changeFormation = (e) => {
        dispatch(setMyTeam(formations[e.target.value]));
    }

    return (
        <div>
            <div>
                <label>Formations</label>
                <select onChange={ (e) => changeFormation(e)}>
                    {formations.map( (obj, i) => <option value={i} key={i}>{obj.label}</option>)}
                </select>
            </div>
            <div className='field'>
                <FieldFormation myTeam={myTeam} pos='gk' />
                <FieldFormation myTeam={myTeam} pos='def' />
                <FieldFormation myTeam={myTeam} pos='mid' />
                <FieldFormation myTeam={myTeam} pos='att' />
            </div>
        </div>
    )
}