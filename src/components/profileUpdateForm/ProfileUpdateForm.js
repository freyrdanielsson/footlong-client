import React, { useState } from 'react';

import './ProfileUpdateForm.scss';

export default function ProfileUpdateForm(props) {
    const { user, submitUpdate } = props;
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

    return (
        <div className='user-form'>
            <h1>Public profile</h1>

            <form className='user-form__content' method='PATCH' onSubmit={e => { e.preventDefault(); submitUpdate(username, email) }}>
                <div className='user-form__input-container'>
                    <label className='user-form__label' htmlFor='username'>Username</label>
                    <input className='user-form__input' id='username' type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className='user-form__input-container'>
                    <label className='user-form__label' htmlFor='email'>Email</label>
                    <input className={'user-form__input'} id='email' type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <button className='user-form__button' disabled={false}>Update profile</button>
            </form>
        </div>
    );
}