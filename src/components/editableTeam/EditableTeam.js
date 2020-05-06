import React from 'react';

import './EditableTeam.scss';
import { getAllPositions, formations } from '../../utils/formations';
import MtPlayerSearch from '../mtPlayerSearch/MtPlayerSearch';
import MtSelectPosition from '../mtSelectPosition/MtSelectPosition';
import Select from '../select/Select';
import DisplayField from '../displayField/DisplayField'
import SaveTeam from '../saveTeam/SaveTeam';

export default function EditableTeam(props) {
    const { idTeamProps, teamProps, playerProps, teamSetter, playerSetter, squadFetcher, teamSaver, teamPatcher, teamDelete, id } = props;
    const { myTeam } = idTeamProps;

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

    const { fetchedTeam } = idTeamProps;
    const oldName = fetchedTeam && id ? fetchedTeam[0].team_name : null; 

    return (
        <div className='myTeam'>
            {oldName && <h3>{oldName}</h3>}
            <div className='displayTeam'>
                <div className='teamVisual'>
                    <Select options={formations} onClickFun={changeFormation} label='Formations' valueKey='value' labelKey='label' />
                    <DisplayField myTeam={myTeam} playerSetter={playerSetter} />
                </div>
                <MtPlayerSearch teamProps={teamProps} playerProps={playerProps} squadFetcher={squadFetcher} playerSetter={playerSetter}/>
            </div>
            <SaveTeam idTeamProps={idTeamProps} teamSaver={teamSaver} teamPatcher={teamPatcher} teamDelete={teamDelete} id={id} />
            <MtSelectPosition myTeamProps={idTeamProps} teamSetter={teamSetter} playerSetter={playerSetter}/>
        </div>
    )
}