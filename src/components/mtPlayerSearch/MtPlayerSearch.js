import React, { useState } from 'react';

import './MtPlayerSearch.scss';

import Select from '../select/Select';
import SquadLists from '../squadLists/SquadLists';

export default function MtPlayerSearch(props) {
    const { selectionProps, handlers } = props;
    const { leagues, leaguesIsFetching, leaguesError } = selectionProps;
    const [ teamIndex, setTeamIndex ] = useState(0);
    const [ teamLogo, setLogo ] = useState(null);    

    if (leaguesIsFetching || leagues.length === 0) {
        return (
            <div>
                <p>Loading teams...</p>
            </div>
        )
    }

    if (leaguesError) {
        const msg = typeof leaguesError === 'string' ? leaguesError : 'Error fetching data';
        return (
            <div>
                <p>{msg}</p>
            </div>
        )
    }

    leagues.map( (obj, i) => obj.value = i);
    const getLeagueClick = (val) => {
        setTeamIndex(val);
        setLogo(leagues[val].teams[0].logo);
        handlers.handleFetchSquad(leagues[val].teams[0].team_id);
    }

    const fetchSquadCatch = (val) => {
        for (let i = 0; i<leagues.length; i += 1 ) {
            const found = leagues[i].teams.find( ({team_id}) => team_id === parseInt(val, 10));
            if(found) {
                setLogo(found.logo);
                break;
            }
        } 
        
        handlers.handleFetchSquad(val);
    }

    const playerSelectCatch = (player) => {
        const logo = teamLogo ? teamLogo : leagues[0].teams[0].logo;
        player.logo = logo;
        handlers.setPlayer(player);
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
                    onClickFun={fetchSquadCatch}
                    label='Teams'
                    valueKey='team_id'
                    labelKey='name' />
            </div>
            <SquadLists 
                isFetching={selectionProps.squadIsFetching}
                squad={selectionProps.squad}
                error={selectionProps.squadError} 
                playerSetter={playerSelectCatch}/>
        </div>
    )
}