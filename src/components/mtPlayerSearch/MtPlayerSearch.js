import React, { useState } from 'react';

import './MtPlayerSearch.scss';

import Select from '../select/Select';
import SquadLists from '../squadLists/SquadLists';

export default function MtPlayerSearch(props) {
    const { teamProps, playerProps, squadFetcher, playerSetter } = props;
    const [ teamIndex, setTeamIndex ] = useState(0);


    if (teamProps.isFetching || teamProps.teams.length === 0) {
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

    const { teams } = teamProps;
    teams.map( (obj, i) => obj.value = i);
    const getLeagueClick = (val) => {
        setTeamIndex(val)
        squadFetcher(teams[val].teams[0].team_id);
    }

    return (
        <div className='searchContainer'>
            <div className='searchTeam'>
                <Select options={teams} onClickFun={getLeagueClick} label='Leagues' valueKey='value' labelKey='title' />
                <Select options={teams[teamIndex].teams} onClickFun={squadFetcher} label='Teams' valueKey='team_id' labelKey='name' />
            </div>
            <SquadLists playerProps={playerProps} playerSetter={playerSetter}/>
        </div>
    )
}