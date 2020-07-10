import React from 'react';
import './Comic.css';

const comic = (props) => {

    return (
        <div className="Comic">
            <h2>Comic #{props.num} ({props.month}/{props.day}/{props.year})</h2>
            <h1>{props.title}</h1>
            <img 
                src={props.img} 
                alt={props.alt} 
                title={props.alt}/> {/* Randall Munroe uses the alt text as the text that shows on hover, but `title` is the <img> property to do that */}
            <br/>
            <p>Link to comic: <a href={'https://xkcd.com/' + props.num +'/'}>{'https://xkcd.com/' + props.num +'/'}</a></p>
        </div>
    )
}

export default comic;