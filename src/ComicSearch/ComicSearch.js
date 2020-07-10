import React from 'react';
import './ComicSearch.css';

const comicSearch = (props) => {
    return (
        <div className="ComicSearch">
            <p>Search comics here:</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
}

export default comicSearch;