import React from 'react';
import { Helmet } from 'react-helmet';

function NotFound(props) {

    return (
        <div className='notFound'>
            <Helmet title='Not Found' />
            <p>Page Not Found!</p>
        </div>
    )
}

export default NotFound;
