import React, { useState } from 'react';

import './DisplayTeam.scss';

export default function DisplayTeam(props) {
    const { formations } = require('../../utils/formations');
    const [ sFormation, setSFormation ] = useState(formations[0]);

    const FieldFormation = (props) => {
        const { obj } = props;
        console.log(Object.keys(obj));
        return (
            <div className='playerPosition'>
                {Object.keys(obj).map( k => {
                    return (
                        <div key={k} className='player'></div>
                    )
                })}
            </div>
        )
    }


    return (
        <div>
            <div>
                <label>Formations</label>
                <select onChange={ (e) => setSFormation(formations[e.target.value])}>
                    {formations.map( (obj, i) => <option value={i} key={i}>{obj.label}</option>)}
                </select>
            </div>
            <div className='field'>
                <FieldFormation obj={sFormation.formation.gk} />
                <FieldFormation obj={sFormation.formation.def} />
                <FieldFormation obj={sFormation.formation.mid} />
                <FieldFormation obj={sFormation.formation.att} />
            </div>
        </div>
    )
}