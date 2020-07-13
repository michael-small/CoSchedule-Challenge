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

  getRandomComicNum(max) {
    return Math.floor(Math.random() * Math.floor(max));
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
    let errorBox;
    if(this.state.error!=='') {
      errorBox = <p className="errorMsg">{this.state.error}</p>
    }

    return (
      <div className="App">
        <h1>bootleg xkcd</h1>
        <form onSubmit={this.comicSearchSubmit} className="comicSearch"> {/* TODO: Break out into own component */}
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
