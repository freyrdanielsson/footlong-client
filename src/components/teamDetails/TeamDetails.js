import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { variants, transition } from '../fixtureDetails/animations';

import './TeamDetails.scss';
import TeamDisplay from '../teamDisplay/TeamDisplay';

export default function TeamDetails(props) {
    const { onClose, onEdit } = props;
    const { idTeam, isFetching } = props.idTeamProps;
    const [ isOwner, setOwner ] = useState(false);
    const label = idTeam ? isFetching ? '...' : idTeam[0].team_name : 'Error';
    
    useEffect(() => {
        if(idTeam && !isFetching) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            if(!user) {
                setOwner(false);
            }
            setOwner(user.id === idTeam[0].owner_id);
        }
    }, [idTeam, isFetching]);

     
    return (
        <React.Fragment>
            {idTeam && 
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
                                <TeamDisplay myTeam={props.idTeamProps} />
                                {isOwner && <button onClick={ () => onEdit(idTeam[0].id)} className='teamDetails__edit'>Edit Team</button>}
                            </div>
                    </motion.div>
                </div>}
        </React.Fragment>
    );
}