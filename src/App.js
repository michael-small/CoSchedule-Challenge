import React, { Component } from 'react';
import Comic from './Comic/Comic';
import ComicSearch from './ComicSearch/ComicSearch';
import './App.css';

class App extends Component {
  state = {
    hardcodedTestComics: [ // Before retrieving from the API, I am crafting the barebone html to display a comic and need filler
      { 
        month: "7",
        num: 2329,
        link: "",
        year: "2020",
        news: "",
        safe_title: "Universal Rating Scale",
        transcript: "",
        alt: "There are plenty of finer gradations. I got 'critically endangered/extinct in the wild' on my exam, although the curve bumped it all the way up to 'venti.'",
        img: "https://imgs.xkcd.com/comics/universal_rating_scale.png",
        title: "Universal Rating Scale",
        day: "6" 
    }
    ]
  }
  
  render () {
    return (
      <div className="App">
        <Comic 
          title={this.state.hardcodedTestComics[0].title}
          img={this.state.hardcodedTestComics[0].img}
          alt={this.state.hardcodedTestComics[0].alt}
          month={this.state.hardcodedTestComics[0].month}
          day={this.state.hardcodedTestComics[0].day}
          year={this.state.hardcodedTestComics[0].year}
          num={this.state.hardcodedTestComics[0].num}/>
        <ComicSearch></ComicSearch>
      </div>
    );
  }

}

export default App;
