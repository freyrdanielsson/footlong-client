import React, { useState } from 'react';

import './DropSelect.scss'

export default function DropSelect(props) {
    const { itList, squadFetcher } = props;
    const [ opIndex, setOptIndex ] = useState(0);

    const getLeagueClick = (val) => {
        setOptIndex(val)
        squadFetcher(itList[val].teams[0].team_id);
    }
    
    return (
       <div className='searchTeam'>
           <div className='labelDrop'>
                <h4 className='dropLabel'>Leagues</h4>
                <select className='mySelect' onChange={ (e) => getLeagueClick(e.target.value)}>
                    {itList.map( (obj, i) =>  <option className='dropOption' value={i} key={i}>{obj.title}</option> )}
                </select>
           </div>
           <div className='labelDrop'>
                <h4 className='dropLabel'>Teams</h4>
                <select onChange={(e) => squadFetcher(e.target.value)} className='mySelect' id='teamSelect'>
                    {itList[opIndex].teams
                    .map( obj => <option value={obj.team_id} key={obj.team_id}>{obj.name}</option> )}
                </select>
           </div>
       </div>
    )
}
