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
            <div className='saveTeam__labels'>
                <h4>Team Name</h4>
                <input className='saveTeam__input' type='text' defaultValue={team.team_name} onChange={(e) => setTname(e.target.value)}></input>
            </div>
            <div className='saveTeam__buttons'>
                <button className='saveTeam__button' onClick={ () => handlers.handleEditTeam(team.id, createInfo())}>Save Team</button>
                <button className='saveTeam__button' onClick={ () => handlers.handleDeleteTeam(team.id)}>Delete Team</button>
            </div>
            {patchError && <ErrorDisplay />}
        </div>
    )
}
