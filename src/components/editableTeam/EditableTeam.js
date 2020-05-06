import React from 'react';

import './EditableTeam.scss';
import { getAllPositions, formations } from '../../utils/formations';
import MtPlayerSearch from '../mtPlayerSearch/MtPlayerSearch';
import MtSelectPosition from '../mtSelectPosition/MtSelectPosition';
import Select from '../select/Select';
import DisplayField from '../displayField/DisplayField'

export default function EditableTeam(props) {
    const { myTeamProps, teamProps, playerProps, teamSetter, playerSetter, squadFetcher } = props;
    const { myTeam } = myTeamProps;

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
        <div className='myTeam'>
            <div className='displayTeam'>
                <div className='teamVisual'>
                    <Select options={formations} onClickFun={changeFormation} label='Formations' valueKey='value' labelKey='label' />
                    <DisplayField myTeam={myTeam} playerSetter={playerSetter} />
                </div>
                <MtPlayerSearch teamProps={teamProps} playerProps={playerProps} squadFetcher={squadFetcher} playerSetter={playerSetter}/>
            </div>
            <MtSelectPosition myTeamProps={myTeamProps} teamSetter={teamSetter} playerSetter={playerSetter}/>
        </div>
    )
}