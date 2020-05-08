import React, { useState, useEffect } from 'react';

import './MtPlayerSearch.scss';

import Select from '../select/Select';
import SquadLists from '../squadLists/SquadLists';

export default function MtPlayerSearch(props) {
    const { selectionProps, handlers } = props;
    const { leagues, leaguesIsFetching, leaguesError } = selectionProps;
    const [ teamIndex, setTeamIndex ] = useState(0);

    if (leaguesIsFetching || leagues.length === 0) {
        return (
            <div>
                <p>Loading teams...</p>
            </div>
        )
    }

    if (leaguesError) {
        return (
            <div>
                <p>{leaguesError}</p>
            </div>
        )
    }

    leagues.map( (obj, i) => obj.value = i);
    const getLeagueClick = (val) => {
        setTeamIndex(val)
        handlers.handleFetchSquad(leagues[val].teams[0].team_id);
    }
        
    return (
        <div className='searchContainer'>
            <div className='searchTeam'>
                <Select 
                    options={leagues} 
                    onClickFun={getLeagueClick} 
                    label='Leagues' 
                    valueKey='value' 
                    labelKey='title' />
                <Select 
                    options={leagues[teamIndex].teams}
                    onClickFun={handlers.handleFetchSquad}
                    label='Teams'
                    valueKey='team_id'
                    labelKey='name' />
            </div>
            <SquadLists 
                isFetching={selectionProps.squadIsFetching}
                squad={selectionProps.squad}
                error={selectionProps.squadError} 
                playerSetter={handlers.setPlayer}/>
        </div>
    )
}