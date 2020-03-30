import React from 'react';

import Fixture from '../fixture/Fixture';

import './League.scss';

export default function League(props) {
    const { title, fixtures } = props
    return (
        <div className='league'>
            <div className='league__header'>
                <h3 className='league__title'>{title}</h3>
            </div>
            <ul className='league__list'>
                {fixtures.map((fixture, i) => {
                    return <Fixture key={i} fixture={fixture} />
                })}
            </ul>
        </div>
    );
}