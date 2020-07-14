import React, { Component } from 'react';
import './ComicSearch.css';

class ComicSearch extends Component {
    render () {
        let errorBox;
        if(this.props.error!=='') {
            errorBox = <p className="errorMsg">{this.props.error}</p>
        }

        return (
            <div className="ComicSearch">
                <form onSubmit={this.props.comicSearchSubmit} className="comicSearch"> {/* TODO: Break out into own component */}
                    <input 
                        type="number" 
                        name="comicSearchNumber" 
                        placeholder="Seach by comic number 🔍" 
                        value={this.props.comicSearchNumber}
                        onChange={this.props.onChange}
                    />
                </form>
                <button onClick={this.props.prevComic}>Previous</button>
                <button onClick={this.props.getRandomComic}>Random</button>
                <button onClick={this.props.nextComic}>Next</button>
                {errorBox}
            </div>
        )
    }

}

export default ComicSearch;