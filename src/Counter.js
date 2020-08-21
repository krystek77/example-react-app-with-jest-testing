import React from 'react';

export default function Counter({ counter }) {
  return React.createElement('p', { className: 'Counter' }, counter);
  //   return <div className='Counter'>{count}</div>;
}
