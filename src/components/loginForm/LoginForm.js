import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import './LoginForm.scss';

export default function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isFetching, message, postUser } = props;

    const loginUser = (e, username, password) => {
        e.preventDefault();
        postUser(username, password)
    }


    if (isFetching) {
        return (
            <div>
                <Helmet defaultTitle='Logging in..' />
                <p>Logging in <em>{username}</em>...</p>
            </div>
        );
    }

    return (
        <div className='login-form'>
            <h1 className='login-form__title'>Login</h1>

            <form className='login-form__content' method='POST' onSubmit={(e) => loginUser(e, username, password)}>
                <div className='login-form__input-container'>
                    <label className='login-form__label' htmlFor='username'>Username</label>
                    <input className='login-form__input' id='username' type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className='login-form__input-container'>
                    <label className='login-form__label' htmlFor='password'>Password</label>
                    <input className='login-form__input' id='password' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className='login-form__button' disabled={isFetching}>Login</button>
            </form>

            {message && <p className='login-form__error'>{message}</p>}
        </div>
    );
}