import React from 'react';
import Counter from './Counter';
import axios from 'axios';

const URL_API = 'http://hn.algolia.com/api/v1/search';

function App() {
  return (
    <div className='App'>
      <h1>Jest Testing in React</h1>
      <h2>Counter</h2>
      <Counter counter={0} />
      <h2>Fetching data from Hacker News</h2>
    </div>
  );
}
export default App;
