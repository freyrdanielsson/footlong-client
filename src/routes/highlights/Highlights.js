import React, { useEffect } from 'react';
import { connect } from 'react-redux';


import fetchHighlights from '../../actions/highlights';

function Highlights(props) {
    const { dispatch, highlights } = props;

    useEffect(() => {
        dispatch(fetchHighlights());
    }, [dispatch]);

    return (
        <div>
            {highlights.map(highlight => {
                return <a key={highlight.title} href={highlight.url}>
                    <img src={highlight.thumbnail} alt={highlight.title}></img>
                </a>
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.highlights.isFetching,
        error: state.highlights.error,
        highlights: state.highlights.highlights,
    }
}

export default connect(mapStateToProps)(Highlights);