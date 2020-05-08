import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import './RegisterForm.scss';

export default function RegisterForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errorClass, setErrorClass] = useState({});
    const [email, setEmail] = useState('');
    const { isFetching, message, registerDispatch, registerError, logginIn } = props;

    const registerUser = (e) => {
        e.preventDefault();

        // Client side validation for matching pw
        if (password !== rePassword) {
            return registerError([
                {
                    field: 'password',
                    message: 'Passwords do not match'
                },
                {
                    field: 'rePassword'
                }
            ])
        }
        setErrorClass({});
        return registerDispatch(email, username, password)
    }

    useEffect(() => {
        if (message) {
            const msg = {}
            message.map(error => {
                return msg[error.field] = 'error'
            })
            setErrorClass(msg);
        }
    }, [message]);

    if (isFetching || logginIn) {
        return (
            <div>
                <Helmet defaultTitle='Creating User..' />
                <p>Creating new user: <em>{username}</em>...</p>
            </div>
        );
    }

    // If message contains error attribute, it's an internal server error.
    if (message && message[0].error) {
        return (
            <div>
                <p>Internal Error - Could not create user</p>
            </div>
        )
    }

    return (
        <div className='register-form'>
            <h1 className='register-form__title'>Register</h1>


            <form className='register-form__content' method='POST' onSubmit={(e) => registerUser(e)}>
                <div className='register-form__input-container'>
                    <label className='register-form__label' htmlFor='email'>Email</label>
                    <input className={`register-form__input ${errorClass.email || ''}`} id='email' type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='register-form__input-container'>
                    <label className='register-form__label' htmlFor='username'>Username</label>
                    <input className={`register-form__input ${errorClass.username || ''}`} id='username' type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className='register-form__input-container'>
                    <label className='register-form__label' htmlFor='password'>Password</label>
                    <input className={`register-form__input ${errorClass.password || ''}`} id='password' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className='register-form__input-container'>
                    <label className='register-form__label' htmlFor='rePassword'>
                        Password again <span role='img' aria-label=''>🙄</span> ...
                    </label>
                    <input className={`register-form__input ${errorClass.rePassword || ''}`} id='rePassword' type='password' name='rePassword' value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                </div>

                <button className='register-form__button' disabled={isFetching}>Register User</button>
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