import React, { Component } from 'react';
import Favorite from '../Favorite/Favorite.js';
import './FavoritesArea.css';

export class FavoritesArea extends Component {

    render () {
        return (
            <div className="Favorites">
                <button onClick={this.props.createFav}>Create Fav <span role="img" aria-label="Heart">❤️</span></button>
                <button onClick={this.props.deleteFav}>Delete Fav <span role="img" aria-label="Broken Heart">💔</span></button>
                {this.props.favorites.map((favorite, index) => (
                    <Favorite key={index} 
                        favorite={favorite} 
                        comicNumber={favorite.comicNumber} 
                        delFavFromFavsCollection={this.props.delFavFromFavsCollection}
                    />
                ))}
            </div>
        )
    }
}

export default FavoritesArea;