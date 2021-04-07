import React from 'react';

import './Events.scss';

export default function Events(props) {
    const { teamSide, fixture_events } = props;
    const goals = {
        home: 0,
        away: 0,
    }

    const eventType = (event) => {
        switch (event.type) {
            case 'subst':
                return substitute(event);
            case 'Goal':
                return goal(event);
            case 'Card':
                return card(event);

            default:
                break;
        }
    }

    const substitute = (event) => {
        return (
            <div className={`event__main event__main--${teamSide(event.teamName)}`}>
                <p className='subst'>{event.assist}</p>
                <p className='subst subst--out'>{event.player}</p>
            </div>
        )
    }

    const goal = (event) => {
        const team = teamSide(event.teamName);

        team === 'home'
            ? goals.home++
            : goals.away++

        return (
            <div className={`event__main event__main--${team}`}>
                <div className='goal'>
                    <p>{event.player}</p>
                    <p className='goal__state'>{`( ${goals.home} - ${goals.away} )`}</p>
                </div>
                {event.assist &&
                    <p className='goal goal--assist'>{`Assist: ${event.assist}`}</p>
                }
            </div>
        )
    }

    const card = (event) => {
        return (
            <div className='event__main'>
                <p className={`card card--${event.detail === 'Red Card' ? 'red' : 'yellow'}`}>{event.player}</p>
            </div>
        )
    }

    return (
        <div className='events'>
            <h2 className='events__title'>Match events</h2>
            {fixture_events.data?.events?.map((event, i) => {
                return (
                    <div className={`event event--${teamSide(event.teamName)}`} key={i}>
                        <p className='event__elapsed'>{event.elapsed}'</p>
                        {eventType(event)}
                    </div>
                );
            })}

        </div>
    );
}