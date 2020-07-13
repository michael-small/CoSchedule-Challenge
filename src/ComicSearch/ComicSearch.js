import React, { Component } from 'react';
import './ComicSearch.css';

class ComicSearch extends Component {
    render () {
        return (
            <div className="ComicSearch">
                <p>Search comics here:</p>
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </div>
        )
    }

}

export default ComicSearch;