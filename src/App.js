import React, { Component } from 'react';
import Comic from './Comic/Comic';
import ComicSearch from './ComicSearch/ComicSearch';
import CommentArea from './CommentArea/CommentArea';
import FavoritesArea from './FavoritesArea/FavoritesArea';
import Axios from 'axios';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      comic: [],
      comicSearchNumber: '',
      comments: [],
      comment: '',
      favorites: [],
      error: ''
    };
  }

  componentDidMount() {
    this.getComic('1346');
  }

  // COMIC METHODS
  getComic = comicNumber => {
    let comicUrl = '/comic/' + comicNumber;
    this.setState({error: ''});
    
    fetch(comicUrl) 
    .then(res => res.json())
    .then(comic => this.setState({comic: comic}, () => console.log('comic fetched...', comic)))
    .then(() => this.setState({comicSearchNumber: ''}))
    .catch((error) => {
      console.error('Error:', error);
      this.setState({error: 'ERROR: Comic #' + comicNumber + ' not found'});
    });
  } 

  comicSearchSubmit = (event) => {
    this.getComic(this.state.comicSearchNumber);
    event.preventDefault();
  }  

  getRandomComic = (event) => {
    let random = Math.floor(Math.random() * Math.floor(2330));
    this.getComic(random)
    event.preventDefault();
  }

  comicSearchSubmit = (event) => {
    this.getComic(this.state.comicSearchNumber);
    event.preventDefault();
  }  
  
  nextComic = (event) => {
    this.getComic(parseInt(this.state.comic.num) + 1);
    event.preventDefault();
  }  
  
  prevComic = (event) => {
    this.getComic(parseInt(this.state.comic.num) - 1);
    event.preventDefault();
  }

  // COMMENT METHODS
  addComment = comment => {
    fetch("/addComment/", {   
      method: 'POST',
      body: JSON.stringify({
        com: comment
      }),
      headers: {"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(data => this.setState({ comments: [...this.state.comments, data[0]] }))
    .then(() => console.log("comments: " + this.state.comments))
    .then(() => this.setState({comment: ''}))
    .catch((error) => {
      console.error('Error:', error);
      this.setState({error: 'ERROR: cannot add comment'});
    });
  }

  deleteComment = comment => {
    Axios.delete("/deleteComment/" + comment).then(res =>
      this.setState({
        comments: [...this.state.comments.filter(com => com !== comment)]
      })
    );
  }

  commentSubmit = (event) => {
    this.addComment(this.state.comment);
    event.preventDefault();
  }

  // FAVORITE METHODS
  favoriteComic = comic => {
    if(this.state.favorites.includes(comic)) {
      return;
    }
    fetch("/favoriteComic/", {   
      method: 'POST',
      body: JSON.stringify({
        fav: comic
      }),
      headers: {"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(data => this.setState({ favorites: [...this.state.favorites, data[0]] }))
    .then(() => console.log("favorites: " + this.state.favorites))
    .catch((error) => {
      console.error('Error:', error);
      this.setState({error: 'ERROR: Could not favorite this comic'});
    });
  }

  deleteFavoriteComic = comic => {
    Axios.delete("/deleteFavoriteComic/" + comic).then(res =>
      this.setState({
        favorites: [...this.state.favorites.filter(fav => fav !== comic)]
      })
    );
  }

  // MISC METHODS
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
  }

  render () {
    return (
      <div className="App">
        <h1>bootleg xkcd</h1>
        <FavoritesArea 
          favorites={this.state.favorites}
          clickCreate={() => this.favoriteComic(this.state.comic.num)} 
          clickDelete={() => this.deleteFavoriteComic(Number.parseFloat(this.state.comic.num))} 
          delFavorite={this.deleteFavoriteComic}
          />
        <ComicSearch 
          error={this.state.error}
          comicSearchNumber={this.state.comicSearchNumber}
          comicSearchSubmit={this.comicSearchSubmit}
          getRandomComic={this.getRandomComic}
          nextComic={this.nextComic}
          prevComic={this.prevComic}
          onChange={this.onChange}/>
        <Comic 
          img={this.state.comic.img}
          alt={this.state.comic.alt}
          title={this.state.comic.title}
          num={this.state.comic.num}
          month={this.state.comic.month}
          day={this.state.comic.day}
          year={this.state.comic.year}/>
        <CommentArea 
          comment={this.state.comment}
          comments={this.state.comments}
          onChange={this.onChange}
          clickCreate={this.commentSubmit} 
          delComment={this.deleteComment}/>
      </div>
    );
  }
}

export default App;
