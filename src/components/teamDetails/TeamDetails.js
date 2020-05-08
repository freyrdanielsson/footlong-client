import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { variants, transition } from '../fixtureDetails/animations';

import './TeamDetails.scss';
import TeamDisplay from '../teamDisplay/TeamDisplay';

export default function TeamDetails(props) {
    const { onClose, onEdit } = props;
    const { idTeam, isFetching, error, user } = props.idTeamProps;
    const [ isOwner, setOwner ] = useState(false);
    const [ updated, setUpdated ] = useState('N/A');

    const label = idTeam ? isFetching ? '...' : idTeam.team_name : 'Error';
    
    useEffect(() => {
        if(idTeam && !isFetching) {
            if(!user || error) {
                setOwner(false);
            }
            else {
                setOwner(user.id === idTeam.owner_id);
            }
            const dateUpdate = new Date(idTeam.updated);
            setUpdated(dateUpdate.toDateString());
        } else {
            setUpdated('N/A');
            setOwner(false);
        }
    }, [error, idTeam, isFetching, user]);
     
    return (
        <React.Fragment>
            { (idTeam || error) && 
                <div className='teamDetails__wrapper'>
                    <motion.div
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={variants}
                        transition={transition}
                        className='teamDetails'>
                            <div className='teamDetails__header'>
                                <button className='teamDetails__close' onClick={onClose}>
                                    <span>✕</span>
                                </button>
                                <div className='teamDetails__headerinfo'>
                                    <div className='teamDetails__protection'></div>
                                    <h1 className='teamDetails__headerText'>{label}</h1>
                                </div>
                            </div>
                            <div className='teamDetails__body'>
                                <TeamDisplay idTeam={idTeam} isFetching={isFetching} error={error} />
                                {!isFetching &&
                                    <div className='teamDetails__footer'>
                                        <div>
                                            {isOwner && <button onClick={ () => onEdit(idTeam.id)} className='teamDetails__edit'>Edit Team</button>}
                                        </div>
                                        <div className='teamDetails__updated'>
                                            <h4 className='teamDetails__updatedLabel'>Last Edited:</h4>
                                            <p>{updated}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                    </motion.div>
                </div>}
        </React.Fragment>
    );
}