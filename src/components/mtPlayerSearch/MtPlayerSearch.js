import React, { useEffect } from 'react';

import { fetchTeams } from '../../actions/players';
import './MtPlayerSearch.scss';

import DropSelect from '../dropSelect/DropSelect';
import SquadLists from '../squadLists/SquadLists';

export default function MtPlayerSearch(props) {
    const { teamProps, playerProps, myTeamProps, dispatch } = props;

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

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
            {teamProps.teams.length > 0 && <DropSelect itList={teamProps.teams} dispatch={dispatch} />}
            <SquadLists playerProps={playerProps} myTeamProps={myTeamProps} dispatch={dispatch}/>
        </div>
    )
}