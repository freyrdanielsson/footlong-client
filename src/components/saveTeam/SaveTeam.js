import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import './SaveTeam.scss'

export default function SaveTeam(props) {
    const { teamSaver, teamPatcher, teamDelete, idTeamProps, id } = props;
    const { myTeam, isDeleting, delError, delSucc, isSaving, saveError, saveSucc, fetchedTeam } = idTeamProps;
    const [ tName, setTname ] = useState('');

    const oldName = fetchedTeam && id ? fetchedTeam[0].team_name : '';

    const user = JSON.parse(window.localStorage.getItem('user'));

    const createInfo = () => {
        const stringTeam = JSON.stringify(myTeam);
        return {
            teamName: tName,
            ownerId: user.id,
            ownerName: user.username,
            lineup: stringTeam,
        }
    }

    if (isDeleting || isSaving) {
        const res = isDeleting ? 'Deleting team...' : 'Saving team...';
        return <p>{res}</p>
    }

    if (delError) {
        return <p>{delError}</p>
    }

    if (delSucc) {
        return(<Redirect to={`/teams`} />)        
    }

    if (saveSucc) {
        return(<Redirect to={`/my-teams`} />)        
    }

    const ErrorDisplay = () => {
        return saveError.map( errObj => {
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
            {!id && 
                <div className='singleButtonLayout'>
                    <label>Team Name</label>
                    <input type='text' onChange={(e) => setTname(e.target.value)}></input>
                    <button onClick={ () => teamSaver(createInfo())}>Save Team</button>
                    {saveError && <ErrorDisplay />}
                </div>
            }
            {id &&
                <div className='doubleButtonLayout'>
                    <label>Team Name</label>
                    <input type='text' placeholder={oldName} onChange={(e) => setTname(e.target.value)}></input>
                    <button onClick={ () => teamPatcher(id, createInfo())}>Save Team</button>
                    <button onClick={ () => teamDelete(id)}>Delete Team</button>
                    {saveError && <ErrorDisplay />}
                </div>
            }
        </div>
    )
}
