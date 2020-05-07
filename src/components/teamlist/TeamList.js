import React from 'react';
import { motion } from 'framer-motion';

import './TeamList.scss';
import { fixtureAnimation, leagueAnimation } from '../league/animations';

export default function TeamList(props) {
    const { customTeamProps } = props;
    const { isFetching, customTeams, error } = customTeamProps;

    const DisplayListItems = () => {
        return customTeams.map( obj => {
            return (
                <tr key={obj.id}>
                    <td>{obj.owner_username}</td>
                    <td>{obj.team_name}</td>
                    <td>{obj.created}</td>
                </tr>
            )
        })
        
    }
    
    return (
        <motion.div initial='hidden' animate='visible' variants={leagueAnimation} className='teams'>
            <table className='teams__table'>
                <thead className='teams__header'>
                    <tr className='teams__title'>
                        <th>Owner</th>
                        <th>Team</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <motion.tbody variants={fixtureAnimation} className='teams__list'>
                    <DisplayListItems />
                </motion.tbody>
            </table>
        </motion.div>
    )
}
