import React, { useEffect } from 'react';

function Highlights() {
    useEffect(() => {
        const widget = document.getElementById('highlights_iframe');
        widget.onload = function () {
            console.clear();
            // Fakk...
            setTimeout(() => { console.clear() }, 500);
        }
    }, [])

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