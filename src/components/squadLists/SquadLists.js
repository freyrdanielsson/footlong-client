import React from 'react';

import './SquadLists.scss';

export default function SquadLists(props) {
    const { isFetching, squad, error,  playerSetter } = props;

    const getPosition = (arr, pos) => {
        return arr.filter( obj => obj.position === pos)
                .sort( (a,b) => (a.player_name > b.player_name) ? 1 : ((b.player_name > a.player_name) ? -1 : 0));
    }
    
    const ifError = [{player_id: 0, player_name: 'Error Fetching'}];
    const ifFetching = [{player_id: 0, player_name: 'Fetching...'}];
    const gk =  isFetching ? ifFetching : error ? ifError : getPosition(squad, 'Goalkeeper');
    const def = isFetching ? ifFetching : error ? ifError : getPosition(squad, 'Defender');
    const mid = isFetching ? ifFetching : error ? ifError : getPosition(squad, 'Midfielder');
    const att = isFetching ? ifFetching : error ? ifError : getPosition(squad, 'Attacker');

    const playerSelect = (e) => {
        if (isFetching || error ) return;
        const playerObj = squad.find( obj => obj.player_id === e.target.value);
        playerSetter(playerObj);
    }

    const SquadList = (props) => {
        const {playerList, label} = props;
        return (
            <div className='listContainer'>
                <h4 className='squadPositionLabel'>{label}</h4>
                <ul className='positionList'>
                    {playerList.map( obj => {
                        return (
                            <li className='playerListItem' value={obj.player_id} key={obj.player_id} onClick={ (e) => playerSelect(e)}>
                                {obj.player_name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    return (
        <div className='allListsContainer'>
            <SquadList playerList={gk} label='Goalkeepers' />
            <SquadList playerList={def} label='Defenders' />
            <SquadList playerList={mid} label='Midfielders' />
            <SquadList playerList={att} label='Attackers' />
        </div>
    )
}