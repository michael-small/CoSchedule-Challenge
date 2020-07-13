import React, { Component } from 'react';
import Comic from './Comic/Comic';
import CommentArea from './CommentArea/CommentArea';
import ComicSearch from './ComicSearch/ComicSearch';
import FavoritesArea from './FavoritesArea/FavoritesArea';
import './App.css';
import Axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      comic: [],
      comicNumber: '',
      comments: [],
      comment: '',
      error: '',
      favorites: []
    };
  }

  componentDidMount() {
    this.getComic('1346');
  }

  getRandomComic = (event) => {
    let random = Math.floor(Math.random() * Math.floor(2330));
    this.getComic(random)
    event.preventDefault();
  }

  comicSearchSubmit = (event) => {
    this.getComic(this.state.comicNumber);
    event.preventDefault();
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
    
  favoriteComic = comic => {
    if(this.state.favorites.includes(comic)) {
      console.log('inludes');
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

  comicSearchSubmit = (event) => {
    this.getComic(this.state.comicNumber);
    event.preventDefault();
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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
  }

  render () {
    return (
      <div className="App">
        <h1>bootleg xkcd</h1>
        <FavoritesArea 
          clickCreate={() => this.favoriteComic(this.state.comic.num)} 
          clickDelete={() => this.deleteFavoriteComic(Number.parseFloat(this.state.comic.num))} 
          favorites={this.state.favorites}
          delFavorite={this.deleteFavoriteComic}/>
        <ComicSearch 
          comicSearchSubmit={this.comicSearchSubmit}
          error={this.state.error}
          comicNumber={this.state.comicNumber}
          onChange={this.onChange}
          getRandomComic={this.getRandomComic}
        />
        <Comic 
          img= {this.state.comic.img}
          alt= {this.state.comic.alt}
          title= {this.state.comic.title}
          num= {this.state.comic.num}
          month= {this.state.comic.month}
          day= {this.state.comic.day}
          year= {this.state.comic.year}
        />
        <CommentArea 
          comment={this.state.comment}
          onChange={this.onChange}
          clickCreate={this.commentSubmit} 
          comments={this.state.comments}
          delComment={this.deleteComment}
        />
      </div>
    );
  }
}

export default App;
