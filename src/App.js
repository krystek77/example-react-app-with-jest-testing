import React from 'react';
import Counter from './Counter';
import axios from 'axios';

const URL_API = 'http://hn.algolia.com/api/v1/search';

function App() {
  const [counter, setCounter] = React.useState(0);
  const [errorCounter, setErrorCounter] = React.useState(null);

  function handleCounter(operationType) {
    switch (operationType) {
      case 'inc':
        setCounter((oldCounter) => oldCounter + 1);
        break;
      case 'dec':
        setCounter((oldCounter) => oldCounter - 1);
        break;
      default:
        const error = {
          message: `Opeartion '${operationType}' not allowed`,
        };
        setErrorCounter(error);
    }
  }
  return (
    <div className='App'>
      <h1>Jest Testing in React</h1>
      <h2>Counter</h2>
      <Counter counter={counter} />
      <div className='btn-group'>
        <button
          className='btn btn-increment'
          data-testid='inc'
          onClick={() => handleCounter('inc')}
        >
          Increment by 1
        </button>
        <button
          className='btn btn-decrement'
          data-testid='dec'
          onClick={() => handleCounter('dec')}
        >
          Decrement by 1
        </button>
      </div>
      {errorCounter && (
        <div className='error-counter'>{errorCounter.message}</div>
      )}
      <h2>Fetching data from Hacker News</h2>
    </div>
  );
}
export default App;
