import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import './RegisterForm.scss';

export default function RegisterForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { isFetching, message, registerDispatch, logginIn } = props;

    if (isFetching || logginIn) {
        return (
            <div>
                <Helmet defaultTitle="Creating User.." />
                <p>Creating new user: <em>{username}</em>...</p>
            </div>
        );
    }

    if (message && message[0].error) {
        return (
            <div>
                <p>Internal Error - Could not create user</p>
            </div>
        )
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
                <form method="POST" onSubmit={(e) => registerDispatch(e, email, username, password)}>
                    <div className="form form--container">
                        <label htmlFor="name">Email:</label>
                        <input className="form__input" id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>

                    <div className="form form--container">
                        <label htmlFor="username">Username:</label>
                        <input className="form__input" id="username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>

                    <div className="form form--container">
                        <label htmlFor="password">Password:</label>
                        <input className="form__input" id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>

                    <button disabled={isFetching}>Register User</button>
                </form>
            </div>
        </div>
    );
}