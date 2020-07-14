import React, { Component } from 'react';
import Favorite from '../Favorite/Favorite.js';
import './FavoritesArea.css';

export class FavoritesArea extends Component {

    render () {
        let favList;
        if(this.props.favorites.length!==0) {
            favList = <span><b>Your favorites:</b> </span>
        } else {
            favList = <span><b>Your favorites: you have no favorites!</b> </span>
        }
        
        return (
            <div className="Favorites">
                <button onClick={this.props.createFav}>Create Fav <span role="img" aria-label="Heart">❤️</span></button>
                <button onClick={this.props.deleteFav}>Delete Fav <span role="img" aria-label="Broken Heart">💔</span></button>
                <div className="favoriteItems">
                    {favList}
                    {this.props.favorites.map((favorite, index) => (
                        <Favorite key={index} 
                            favorite={favorite} 
                            comicNumber={favorite.comicNumber} 
                            delFavFromFavsCollection={this.props.delFavFromFavsCollection}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default FavoritesArea;