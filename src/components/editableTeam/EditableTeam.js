import React from 'react';

import './EditableTeam.scss';
import { getAllPositions, formations } from '../../utils/formations';
import MtPlayerSearch from '../mtPlayerSearch/MtPlayerSearch';
import MtSelectPosition from '../mtSelectPosition/MtSelectPosition';
import Select from '../select/Select';
import DisplayField from '../displayField/DisplayField'
import SaveTeam from '../saveTeam/SaveTeam';
import TeamDisplay from '../teamDisplay/TeamDisplay';

export default function EditableTeam(props) {
    const { 
        teamProps, 
        selectionProps, 
        handlerProps, 
        teamId,
        team } = props;

    

    return (
        <div className='edit'>
            <div className='edit__teamView'>
               <Select 
                    options={formations} 
                    onClickFun={handlerProps.handleChangeFormation}
                    label='Formation' 
                    valueKey='value' 
                    labelKey='label' />
               <TeamDisplay idTeam={team} /> 
            </div>
            <MtPlayerSearch selectionProps={selectionProps} handlers={handlerProps} />
        </div>
    )
}