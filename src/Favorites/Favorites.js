import React, { Component } from 'react';
import './Favorites.css';

export class Favorites extends Component {

    render () {
        return (
            <div className="Favorites">
                <button onClick={this.props.clickCreate}>Create Fav <span role="img" aria-label="Heart">❤️</span></button>
                <button onClick={this.props.clickDelete}>Delete Fav <span role="img" aria-label="Broken Heart">💔</span></button>
                <div>Favorite comics:
                    {this.props.favItems.map((favorite, index) => (
                    <button key={index}> {favorite} X </button>
                    ))}
                </div>
            </div>
        )
    }
}

export default Favorites;