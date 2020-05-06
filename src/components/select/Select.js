import React from 'react';

import './Select.scss'

export default function Select(props) {
    const { options, onClickFun, label, valueKey, labelKey } = props;
    
    return (
        <div className='labelDrop'>
            <h4 className='dropLabel'>{label}</h4>
            <select className='mySelect' id={label} onChange={ (e) => onClickFun(e.target.value)}>
                {options.map( obj => <option value={obj[valueKey]} key={obj[valueKey]}>{obj[labelKey]}</option>)}
            </select>
        </div>
    )
}
