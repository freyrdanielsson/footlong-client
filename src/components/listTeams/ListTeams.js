import React from 'react';

import './ListTeams.scss';

export default function ListTeams(props) {
    const { teamList } = props;
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Owner</th>
                    <th>Team</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                {teamList.map( obj => {
                    return (
                        <tr key={obj.id}>
                            <td>{obj.owner_username}</td>
                            <td>{obj.team_name}</td>
                            <td>{obj.created}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
