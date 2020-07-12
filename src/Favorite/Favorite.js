import React, { Component } from 'react';
import './Favorite.css';

export class Favorite extends Component {

    render () {
        return (
            <div className="Favorite">
                {this.props.favorite}
                <button onClick={this.props.delFavorite.bind(this, this.props.favorite)}>X</button>
            </div>
        )
    }
}

export default Favorite;