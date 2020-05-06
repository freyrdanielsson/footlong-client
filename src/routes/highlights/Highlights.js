import React from 'react';

function Highlights() {

    return (
        <React.Fragment>
            <iframe
                id='highlights_iframe'
                title='highlights'
                src='https://www.scorebat.com/embed/'
                frameBorder='0' width='600' height='760'
                /* allow='autoplay; fullscreen'
                allowFullScreen */
                style={{
                    width: '600px',
                    height: '760px',
                    overflow: 'hidden',
                    display: 'block',
                }}
                className='_scorebatEmbeddedPlayer_' />
        </React.Fragment>
    )
}

export default Highlights;