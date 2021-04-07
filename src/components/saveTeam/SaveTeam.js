import React, { useState } from 'react';

import './SaveTeam.scss'

export default function SaveTeam(props) {
    const { teamProps, handlers, team } = props;
    const { deleting, delError, patching, patchError } = teamProps;
    const [ tName, setTname ] = useState(team.team_name);

    const createInfo = () => {
        return {
            teamName: tName,
            lineup: JSON.stringify(team.lineup),
        }
    }

    if (deleting || patching) {
        const res = deleting ? 'Deleting team...' : 'Saving team...';
        return <p>{res}</p>
    }

    if (delError) {
        return <p>{delError}</p>
    }
    
    return (
        <div className='saveTeam'>
            <div className='saveTeam__labels'>
                <h4>Team Name</h4>
                <input className='saveTeam__input' type='text' defaultValue={team.team_name} onChange={(e) => setTname(e.target.value)}></input>
            </div>
            <div className='saveTeam__buttons'>
                <button className='saveTeam__edit' onClick={ () => handlers.handleEditTeam(team.id, createInfo())}>Save Team</button>
                <button className='saveTeam__delete' onClick={ () => handlers.handleDeleteTeam(team.id)}>Delete Team</button>
            </div>
            {patchError && 
                <div><p>{patchError}</p></div>
            }
        </div>
    )
}
