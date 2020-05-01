import React from 'react';

import './DisplayTeam.scss';
import { setMyTeam } from '../../actions/players';
import { getAllPositions, formations } from '../../utils/formations';

export default function DisplayTeam(props) {
    const { dispatch, myTeamProps } = props;
    const { myTeam } = myTeamProps;

    const FieldFormation = (props) => {
        const { myTeam, pos } = props;
        return (
            <div className='playerPosition'>
                {myTeam.formation[pos].map( k => { 
                    const playerName = myTeam.team[k].player_name ? myTeam.team[k].player_name : k; 
                    return <p key={k} id={k} className='player'>{playerName}</p> 
                })}
            </div>
        )
    }

    const changeFormation = (e) => {
        const newTeam = formations[e.target.value];
        const newPositions = getAllPositions(newTeam.formation);
        const oldPositions = getAllPositions(myTeam.formation);
        for (let i=0; i<newPositions.length; i += 1) {
            if (myTeam.team[oldPositions[i]].player_id) {
                newTeam.team[newPositions[i]] = myTeam.team[oldPositions[i]];
            }
        }
        dispatch(setMyTeam(newTeam));
    }

    return (
        <div className='teamVisual'>
            <div className='labelDrop'>
                <label>Formations</label>
                <select className='mySelect' onChange={ (e) => changeFormation(e)}>
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