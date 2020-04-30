import React from 'react';

import './SquadLists.scss';
import { setMyPlayer } from '../../actions/players';

export default function SquadLists(props) {
    const { playerProps, dispatch } = props;
    
    if ( playerProps.players.length === 0 && !playerProps.isFetching ) {
        return <p>Select a squad to fetch above</p>
    }
    if ( playerProps.isFetching ) {
        return <p>Fetching squad...</p>
    }

    const getPosition = (arr, pos) => {
        return arr.filter( obj => obj.position === pos)
                .sort( (a,b) => (a.player_name > b.player_name) ? 1 : ((b.player_name > a.player_name) ? -1 : 0));
    }
    
    const gk = getPosition(playerProps.players, 'Goalkeeper');
    const def = getPosition(playerProps.players, 'Defender');
    const mid = getPosition(playerProps.players, 'Midfielder');
    const att = getPosition(playerProps.players, 'Attacker');

    const playerSelect = (e) => {
        const playerObj = playerProps.players.find( obj => obj.player_id === e.target.value);
        dispatch(setMyPlayer(playerObj));
    }

    const SquadList = (props) => {
        const {playerList, label} = props;
        return (
            <div>
                <h4>{label}</h4>
                <ul>
                    {playerList.map( obj => {
                        return (
                            <li value={obj.player_id} key={obj.player_id} onClick={ (e) => playerSelect(e)}>
                                {obj.player_name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    return (
        <div>
            <SquadList playerList={gk} label='Goalkeepers' />
            <SquadList playerList={def} label='Defenders' />
            <SquadList playerList={mid} label='Midfielders' />
            <SquadList playerList={att} label='Attackers' />
        </div>
    )
}