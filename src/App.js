import React from 'react';
import Counter from './Counter';
import axios from 'axios';

const URL_API = 'http://hn.algolia.com/api/v1/search';

function dataReducer(state, action) {
  switch (action.type) {
    case 'SET_LIST':
      return { ...state, list: action.data, error: null };
    case 'SET_ERROR':
      return { ...state, list: [], error: action.error };
    default:
      throw new Error('Operation not allowed');
  }
}

const initialData = {
  list: [],
  error: null,
};

function App() {
  const [counter, setCounter] = React.useState(0);
  const [errorCounter, setErrorCounter] = React.useState(null);
  const [data, dispatch] = React.useReducer(dataReducer, initialData);

  /**
   *  Handles the counter
   * @param {string} operationType
   */
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

  React.useEffect(() => {
    let isMounted = true;
    const loadData = async function () {
      if (isMounted) {
        try {
          const response = await axios.get(`${URL_API}?query=react`);

          dispatch({ type: 'SET_LIST', data: response.data.hits });
        } catch (error) {
          dispatch({ type: 'SET_ERROR', error: error });
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='App'>
      <h1>Jest Testing in React</h1>

      {/** Counter */}
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

      {/** Fetching data */}
      <h2>Fetching data from Hacker News</h2>
      {data.error && <div className='error'>{data.error.message}</div>}
      <ul className='list-items'>
        {data.list.map(({ title, url, objectID }) => {
          return (
            <li className='list-item' key={objectID}>
              <h3>{title}</h3>
              <a
                className='link'
                href={url}
                target='_blanc'
                rel='noopener norefferer'
              >
                {url}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default App;
