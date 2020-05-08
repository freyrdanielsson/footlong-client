import React, { useState } from 'react';

import './SaveTeam.scss'

export default function SaveTeam(props) {
    const { teamProps, handlers, team, user } = props;
    const { deleting, delError, delSuccess, patching, patchError, patchSuccess} = teamProps;
    const [ tName, setTname ] = useState(team.team_name);

    const createInfo = () => {
        return {
            teamName: tName,
            ownerId: user.id,
            ownerName: user.username,
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

    if (delSuccess || patchSuccess) {
        handlers.handleSuccess();     
    }

    const ErrorDisplay = () => {
        return patchError.map( errObj => {
            return (
                <div key={errObj.field}>
                    <p>{errObj.field}</p>
                    <p>{errObj.message}</p>
                </div>
            )
        })
    } 
    
    return (
        <div className='saveTeam'>
            <div className='doubleButtonLayout'>
                <label>Team Name</label>
                <input type='text' defaultValue={team.team_name} onChange={(e) => setTname(e.target.value)}></input>
                <button onClick={ () => handlers.handleEditTeam(team.id, createInfo())}>Save Team</button>
                <button onClick={ () => handlers.handleDeleteTeam(team.id)}>Delete Team</button>
                {patchError && <ErrorDisplay />}
            </div>
        </div>
    )
}
