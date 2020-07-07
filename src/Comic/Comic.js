import React from 'react';
import './Comic.css';

const comic = (props) => {
    return (
        <div className="Comic">
            <h2>Comic title will go here</h2>
            <p>More info on the comic, including its picture, will go below.</p>
            <p>Here is the comic from July 7, 2020. Hardcoded in for reference before working on the API.</p>
            <img src="https://imgs.xkcd.com/comics/universal_rating_scale.png" alt="Comic from July 7, 2020" />
        </div>
    )
}

export default comic;