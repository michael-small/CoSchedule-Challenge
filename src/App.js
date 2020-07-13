import React, { Component } from 'react';
import Comic from './Comic/Comic';
import CommentArea from './CommentArea/CommentArea';
import ComicSearch from './ComicSearch/ComicSearch';
import './App.css';
import Axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      comic: [],
      comicNumber: '',
      error: '',
      comments: [],
      comment: ''
    };
  }

  componentDidMount() {
    this.getComic('2330');
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
    .then(data => this.setState({ comments: [...this.state.comments, data[0]] }, () => console.log('posted: ', data)))
    .then(() => console.log("comments: " + this.state.comments))
    .then(() => this.setState({comment: ''}))
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
          delComment={this.deleteCommic}
        />
      </div>
    );
  }

}

export default App;
