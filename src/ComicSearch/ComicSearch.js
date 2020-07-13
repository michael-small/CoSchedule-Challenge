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
                        name="comicNumber" 
                        placeholder="Seach by comic number 🔍" 
                        value={this.props.comicNumber}
                        onChange={this.props.onChange}
                    />
                </form>
                <button onClick={this.props.getRandomComic}>Random</button>
                {errorBox}
            </div>
        )
    }

}

export default ComicSearch;