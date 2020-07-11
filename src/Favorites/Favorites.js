import React from 'react';
import './Favorites.css';

const favorites = (props) => {

    return (
        <div className="Favorites">
            <button onClick={props.click}>Create Fav <span role="img" aria-label="Heart">❤️</span></button>
            <button>Delete Fav <span role="img" aria-label="Broken Heart">💔</span></button>
            <p>Favorite comics:
                {props.favItems.map((favorite, index) => (
                <span key={index}> {favorite} X </span>
                ))}
            </p>
        </div>
    )
}

export default favorites;