import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';

export default function Header(props) {
    const { isAuth } = props

    const login = isAuth
        ? <NavLink activeClassName='header__link--selected' exact to='/profile'>Profile</NavLink>
        : <NavLink activeClassName='header__link--selected' exact to='/login'>Login</NavLink>;

    return (
        <header className='header'>
            <h1 className='header__title'>
                <Link to='/'>Footlong</Link>
            </h1>

            <nav className='header__nav'>
                <ul className='header__list'>
                    <li className='header__item header__item--dream-teams'>
                        <NavLink activeClassName='header__link--selected' exact to='/teams'>
                            Dream teams <span role='img' aria-label=''>🏆</span>
                        </NavLink>
                    </li>
                    <li className='header__item'>
                        <NavLink activeClassName='header__link--selected' exact to='/highlights'>Highlights</NavLink>
                    </li>
                    <li className='header__item'>{login}</li>
                </ul>
            </nav>

        </header>
    );
}