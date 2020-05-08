import React from 'react';
import { Helmet } from 'react-helmet';

import './Highlights.scss'

function Highlights() {

    return (
        <div className='highlights'>
            <Helmet title='Highlights' />

            <iframe
                id='highlights__widget'
                title='highlights'
                src='https://www.scorebat.com/embed/'
                frameBorder='0' width='600' height='760'
                style={{
                    width: '600px',
                    height: '760px',
                    overflow: 'hidden',
                    display: 'block',
                }}
                className='_scorebatEmbeddedPlayer_' />
        </div >
    )
}

export default Highlights;