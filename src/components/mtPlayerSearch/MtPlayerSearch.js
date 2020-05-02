import React from 'react';

import './MtPlayerSearch.scss';

import DropSelect from '../dropSelect/DropSelect';
import SquadLists from '../squadLists/SquadLists';

export default function MtPlayerSearch(props) {
    const { teamProps, playerProps, squadFetcher, playerSetter } = props;

    if (teamProps.isFetching) {
        return (
            <div>
                <p>Loading teams...</p>
            </div>
        )
    }

    if (teamProps.error) {
        return (
            <div>
                <p>{teamProps.error}</p>
            </div>
        )
    }

    return (
        <div className='searchContainer'>
            {teamProps.teams.length > 0 && <DropSelect itList={teamProps.teams} squadFetcher={squadFetcher} />}
            {teamProps.teams.length > 0 && <SquadLists playerProps={playerProps} playerSetter={playerSetter}/>}
        </div>
    )
}