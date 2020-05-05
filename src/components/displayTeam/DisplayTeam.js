import React from 'react';

import './DisplayTeam.scss';
import { getAllPositions, formations } from '../../utils/formations';
import Select from '../select/Select';

export default function DisplayTeam(props) {
    const { teamSetter, myTeam, playerSetter } = props;

    const FieldFormation = (props) => {
        const { myTeam, pos } = props;
        return (
            <div className='playerPosition'>
                {myTeam.formation[pos].map( k => { 
                    const playerName = myTeam.team[k].player_name ? myTeam.team[k].player_name : k; 
                    return <p onClick={ () => playerSetter(myTeam.team[k])} key={k} id={k} className='player'>{playerName}</p> 
                })}
            </div>
        )
    }

    const changeFormation = (val) => {
        const newTeam = formations[val];
        const newPositions = getAllPositions(newTeam.formation);
        const oldPositions = getAllPositions(myTeam.formation);
        for (let i=0; i<newPositions.length; i += 1) {
            if (myTeam.team[oldPositions[i]].player_id) {
                newTeam.team[newPositions[i]] = myTeam.team[oldPositions[i]];
            }
        }
        teamSetter(newTeam);
    }

    return (
        <div className='teamVisual'>
            <Select options={formations} onClickFun={changeFormation} label='Formations' valueKey='value' labelKey='label' />
            <div className='field'>
                <FieldFormation myTeam={myTeam} pos='gk' />
                <FieldFormation myTeam={myTeam} pos='def' />
                <FieldFormation myTeam={myTeam} pos='mid' />
                <FieldFormation myTeam={myTeam} pos='att' />
            </div>
        </div>
    )
}