import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import './LoginForm.scss';

export default function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isFetching, message, postUser } = props;

    if (isFetching) {
        return (
            <div>
                <Helmet defaultTitle="Logging in.." />
                <p>Logging in <em>{username}</em>...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Login</h1>
            {message && (
                <p>{message}</p>
            )}
            <div className="form row">
                <form method="POST" onSubmit={(e) => postUser(e, username, password)}>

                    <div className="form form--container col col-12">
                        <label htmlFor="username">Username:</label>
                        <input className="form__input" id="username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="form form--container col col-12">
                        <label htmlFor="password">Password:</label>
                        <input className="form__input" id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button disabled={isFetching}>Login</button>
                </form>
            </div>
        </div>
    );
}