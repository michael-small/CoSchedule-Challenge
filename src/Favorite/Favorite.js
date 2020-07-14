import React, { Component } from 'react';
import './Favorite.css';

export class Favorite extends Component {

    render () {
        return (
            <span className="Favorite">
                {this.props.favorite}
                <button onClick={this.props.delFavFromFavsCollection.bind(this, this.props.favorite)}>X</button>
            </span>
        )
    }
}

export default Favorite;