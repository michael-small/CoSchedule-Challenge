import React from 'react';
import './Favorites.css';

const favorites = (props) => {

    return (
        <div className="Favorites">
            <button>Create Fav <span role="img" aria-label="Heart">❤️</span></button>
            <button>Delete Fav <span role="img" aria-label="Broken Heart">💔</span></button>
        </div>
    )
}

export default favorites;