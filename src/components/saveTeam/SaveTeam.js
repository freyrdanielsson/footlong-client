import React, { useState } from 'react';

import './SaveTeam.scss'

export default function SaveTeam(props) {
    const { teamSaver, teamPatcher, teamDelete, myTeam, id } = props;
    const [ tName, setTname ] = useState('');

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
    
    return (
        <div className='saveTeam'>
            {!id && 
                <div className='singleButtonLayout'>
                    <label>Team Name</label>
                    <input type='text' onChange={(e) => setTname(e.target.value)}></input>
                    <button onClick={ () => teamSaver(createInfo())}>Save Team</button>
                </div>
            }
            {id &&
                <div className='doubleButtonLayout'>
                    <label>Team Name</label>
                    <input type='text' onChange={(e) => setTname(e.target.value)}></input>
                    <button onClick={ () => teamPatcher(id, createInfo())}>Save Team</button>
                    <button onClick={ () => teamDelete(id)}>Delete Team</button>
                </div>
            }
        </div>
    )
}
