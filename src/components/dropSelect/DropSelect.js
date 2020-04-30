import React, { useState } from 'react';

import { fetchPlayers } from '../../actions/players';

export default function DropSelect(props) {
    const { itList, dispatch } = props;
    const [ opIndex, setOptIndex ] = useState(0);

    const getSquadClick = () => {
        const sE = document.querySelector('.teamSelect');
        dispatch(fetchPlayers(sE.value));
    }

    return (
       <div>
           <div>
                <label>Leagues</label>
                <select onChange={ (e) => setOptIndex(e.target.value)}>
                    {itList.map( (obj, i) =>  <option value={i} key={i}>{obj.title}</option> )}
                </select>
           </div>
           <div>
                <label>Teams</label>
                <select className='teamSelect'>
                    {itList[opIndex].teams
                    .sort( (a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                    .map( obj => <option value={obj.team_id} key={obj.team_id}>{obj.name}</option> )}
                </select>
           </div>
           <button onClick={ () => getSquadClick()}>Get Squad</button> 
       </div>
    )
}