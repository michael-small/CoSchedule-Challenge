import React, { Component } from 'react';
import Comic from './Comic/Comic';
import ComicSearch from './ComicSearch/ComicSearch';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      comic: [],
      comicNumber: '',
      error: ''
    };
  }

  componentDidMount() {
    this.getComic('2330');
  }

  getComic = comicNumber => {
    let comicUrl = '/comic/' + comicNumber;
    this.setState({error: ''});
    
    fetch(comicUrl) 
    .then(res => res.json())
    .then(comic => this.setState({comic: comic}, () => console.log('comic fetched...', comic)))
    .catch((error) => {
      console.error('Error:', error);
      this.setState({error: 'ERROR: Comic #' + comicNumber + ' not found'});
    });
  }  

  comicSearchSubmit = (event) => {
    this.getComic(this.state.comicNumber);
    event.preventDefault();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  getRandomComicNum(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render () {
    let errorBox;
    if(this.state.error!=='') {
      errorBox = <p className="errorMsg">{this.state.error}</p>
    }
    return (
      <div className="App">
        <h1>bootleg xkcd</h1>
        <div id="favoritesArea"> {/* TODO: Break into own component */}
          <button>Create Fav <span role="img" aria-label="Heart">❤️</span></button>
          <button>Delete Fav <span role="img" aria-label="Broken Heart">💔</span></button>
        </div>
        <form onSubmit={this.comicSearchSubmit} className="comicSearch"> {/* TODO: Break into own component */}
          <input 
            type="text" 
            name="comicNumber" 
            placeholder="Seach by comic number" 
            value={this.state.comicNumber}
            onChange={this.onChange}
          />
          <input 
            type="submit" 
            value="Submit" 
            className="btn"
          />
        </form>
        <button onClick={() => this.getComic(this.getRandomComicNum(2330))}>Random</button>
        {errorBox}
        <Comic 
          img= {this.state.comic.img}
          alt= {this.state.comic.alt}
          title= {this.state.comic.title}
          num= {this.state.comic.num}
          month= {this.state.comic.month}
          day= {this.state.comic.day}
          year= {this.state.comic.year}
        />
      </div>
    );
  }

}

export default App;
