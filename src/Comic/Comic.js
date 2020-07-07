import React from 'react';
import './Comic.css';

const comic = (props) => {
    return (
        <div className="Comic">
            <h3>Comic #{props.num} ({props.month}/{props.day}/{props.year})</h3>
            <h2>{props.title}</h2>
            <p>More info on the comic, will go below.</p>
            <p>Here is the comic from . Hardcoded in for reference before working on the API.</p>
            <img 
                src={props.img} 
                alt={props.alt} 
                title={props.alt}/> {/* Randall Munroe uses the alt text as the text that shows on hover, but `title` is the <img> property to do that */}
        </div>
    )
}

export default comic;