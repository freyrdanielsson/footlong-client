import React, { useState } from 'react';

import './ProfileUpdateForm.scss';

export default function ProfileUpdateForm(props) {
    const { user, submitUpdate } = props;
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [changePassword, setChangePassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        submitUpdate(username, email, password);
    }

    return (
        <div className='user-form'>
            <h1>Public profile</h1>

            <form className='user-form__content' method='PATCH' onSubmit={e => handleSubmit(e)}>


                {!changePassword &&
                    <React.Fragment>
                        <div className='user-form__input-container'>
                            <label className='user-form__label' htmlFor='username'>Username</label>
                            <input className='user-form__input' id='username' type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className='user-form__input-container'>
                            <label className='user-form__label' htmlFor='email'>Email</label>
                            <input className='user-form__input' id='email' type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <button className='user-form__button user-form__button--password' onClick={() => setChangePassword(true)}>Change password?</button>
                    </React.Fragment>
                }

                {changePassword &&
                    <React.Fragment>
                        <div className='user-form__input-container'>
                            <label className='user-form__label' htmlFor='password'>New password</label>
                            <input className='user-form__input' id='password' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className='user-form__input-container'>
                            <label className='user-form__label' htmlFor='rePassword'>
                                New password again <span role='img' aria-label=''>🙄</span> ...
                            </label>
                            <input className='user-form__input' id='rePassword' type='password' name='rePassword' value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                        </div>

                        <button className='user-form__button user-form__button--password' onClick={() => setChangePassword(false)}>Cancel</button>
                    </React.Fragment>
                }


                <button className='user-form__button' disabled={false}>Update profile</button>
            </form>
        </div>
    );
}