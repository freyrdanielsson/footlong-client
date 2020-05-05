import React from 'react';

import './DisplayTeam.scss';
import { getAllPositions, formations } from '../../utils/formations';
import Select from '../select/Select';
import DisplayField from '../displayField/DisplayField'

export default function DisplayTeam(props) {
    const { teamSetter, myTeam, playerSetter } = props;

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
            <DisplayField myTeam={myTeam} playerSetter={playerSetter} />
        </div>
    )
}