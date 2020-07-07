import React from 'react';
import Comic from './Comic/Comic';
import ComicSearch from './ComicSearch/ComicSearch';
import './App.css';

function App() {
  return (
    <div className="App">
      <Comic></Comic>
      <ComicSearch></ComicSearch>
    </div>
  );
}

export default App;
