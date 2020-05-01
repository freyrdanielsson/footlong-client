import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import { registerUser } from '../../actions/register';
import './RegisterForm.scss';

export default function RegisterForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { dispatch, isFetching, message } = props;

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerUser(name, username, password));
    }

    if (isFetching) {
        return (
            <div>
                <Helmet defaultTitle="Creating User.." />
                <p>Creating new user: <em>{username}</em>...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Register</h1>
            {message && (
                <ul>{message.map((error, i) => (
                    <ul key={i}>
                        <dt>{error.field}</dt>
                        <dd>{error.message}</dd>
                    </ul>
                ))}
                </ul>
            )}
            <div className="form">
                <form method="POST" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form form--container">
                        <label htmlFor="name">Name:</label>
                        <input className="form__input" id="name" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form form--container">
                        <label htmlFor="username">Username:</label>
                        <input className="form__input" id="username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="form form--container">
                        <label htmlFor="password">Password:</label>
                        <input className="form__input" id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button disabled={isFetching}>Register User</button>
                </form>
            </div>
        </div>
    );
}