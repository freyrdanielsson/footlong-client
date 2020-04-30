import React, { useState } from 'react';

import './DisplayTeam.scss';
import { setMyTeam } from '../../actions/players';

export default function DisplayTeam(props) {
    const { formations } = require('../../utils/formations');
    const [ sFormation, setSFormation ] = useState(formations[0]);
    const { dispatch } = props;

    const FieldFormation = (props) => {
        const { obj } = props;
        return (
            <div className='playerPosition'>
                {Object.keys(obj).map( k => {
                    return (
                        <div key={k} id={k} className='player'></div>
                    )
                })}
            </div>
        )
    }

    const changeFormation = (e) => {
        setSFormation(formations[e.target.value]);
        dispatch(setMyTeam(formations[e.target.value]));
    }

    return (
        <div>
            <div>
                <label>Formations</label>
                <select onChange={ (e) => changeFormation(e)}>
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