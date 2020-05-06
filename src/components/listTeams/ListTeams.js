import React from 'react';

import './ListTeams.scss';

export default function ListTeams(props) {
    const { customTeamProps, all } = props;
    const { isFetching, customTeams, error } = customTeamProps;

    const DisplayListItems = () => {
        return customTeams.map( obj => {
            return (
                <tr key={obj.id}>
                    {all && <td>{obj.owner_username}</td>}
                    <td>{obj.team_name}</td>
                    <td>{obj.created}</td>
                </tr>
            )
        })
        
    }
    
    return (
        <div className='teamsList'>
            <table>
                <thead>
                    <tr>
                        {all && <th>Owner</th> }
                        <th>Team</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    <DisplayListItems />    
                </tbody>
            </table>
            {isFetching && <p>Loading Teams...</p>}
            {error && <p>{error}</p>}
        </div>
    )
}
