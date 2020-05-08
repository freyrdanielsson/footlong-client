import React, { useEffect, useState } from 'react';

import './CreateTeam.scss';

export default function CreateTeam(props) {
    const { onSubmit } = props;

    const [teamName, setTeamName] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [createMode, setCreateMode] = useState(false);

    useEffect(() => {
        setButtonDisabled(teamName === '')
    }, [teamName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(teamName);
    }

    if (!createMode) {
        return (
            <div className='create-team'>
                <button className='create-team__button' onClick={() => setCreateMode(true)}>Create new team</button>
            </div>
        )
    }

    return (
        <div className='create-team'>
            <form className='create-team__content' method='POST' onSubmit={e => handleSubmit(e)}>
                <div className='create-team__input-container'>
                    <label className='create-team__label' htmlFor='teamName'>Team name</label>
                    <div className='create-team__input-wrapper'>
                        <input className='create-team__input' id='teamName' type='text' name='teamName' value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                        <button className={`create-team__button ${buttonDisabled ? 'disabled' : ''}`} disabled={buttonDisabled}>Save</button>
                        <button className='create-team__button create-team__button--cancel' onClick={e => { e.preventDefault(); setCreateMode(false) }}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
}