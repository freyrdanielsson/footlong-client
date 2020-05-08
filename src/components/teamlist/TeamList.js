import React from 'react';
import { motion } from 'framer-motion';

import './TeamList.scss';
import { fixtureAnimation, leagueAnimation } from '../league/animations';

export default function TeamList(props) {
    const { teamListProps, handler, user } = props;
    const { isFetching, customTeams, error } = teamListProps;

    const DisplayListItems = () => {
        return customTeams.map( obj => {
            const created = new Date(obj.created);
            const isOwner = user ? user.id === obj.owner_id ? 'owner' : 'notOwner' : 'notOwner';
            return (
                <tr key={obj.id} className='teams__line' onClick={() => handler(obj.id)}>
                    <td className={`teams__${isOwner}`}>{obj.owner_username}</td>
                    <td>{obj.team_name}</td>
                    <td>{created.toDateString()}</td>
                </tr>
            )
        }) 
    }

    if (isFetching) {
        return <p>Fetching teams...</p>
    }

    if (error) {
        return <p>Could not fetch teams</p>
    }
    
    return (
        <motion.div initial='hidden' animate='visible' variants={leagueAnimation} className='teams'>
            <table className='teams__table'>
                <thead className='teams__header'>
                    <tr className='teams__title'>
                        <th>Owner</th>
                        <th>Team Name</th>
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
