import React, { useEffect, useState } from 'react';

import './ProfileUpdateForm.scss';

export default function ProfileUpdateForm(props) {
    const { userProps, submitUpdate, uploadError, onCancel } = props;
    const { message } = userProps;

    const [username, setUsername] = useState(userProps.user.username);
    const [email, setEmail] = useState(userProps.user.email);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [changePassword, setChangePassword] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        setButtonDisabled(
            (username === userProps.user.username && email === userProps.user.email && !changePassword)
            || (rePassword === '' && rePassword === '' && changePassword))
    }, [username,
        email,
        password, rePassword,
        changePassword,
        userProps.user.username,
        userProps.user.email])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== rePassword) {
            return uploadError([
                {
                    field: 'password',
                    message: 'Passwords do not match'
                },
                {
                    field: 'rePassword'
                }
            ]);
        }

        submitUpdate({ username, email, password });
    }

    return (
        <div className='user-form'>
            <h1>Public profile</h1>
            <button className='user-form__navigate user-form__navigate--cancel' onClick={onCancel}>Cancel</button>

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

                        <button className='user-form__navigate' onClick={() => setChangePassword(true)}>Change password</button>
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

                        <button className='user-form__navigate' onClick={() => setChangePassword(false)}>Change profile</button>
                    </React.Fragment>
                }
                <button className={`user-form__button ${buttonDisabled ? 'disabled' : ''}`} disabled={buttonDisabled}>Update profile</button>
            </form>

            {message &&
                <ul>
                    {message.map((error, i) => {
                        return (
                            <ul className='register-form__error' key={i}>
                                <dd>{error.message}</dd>
                            </ul>);
                    })}
                </ul>
            }
        </div>
    );
}