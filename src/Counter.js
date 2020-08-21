import React from 'react';

export default function Counter({ count }) {
  return React.createElement('div', { className: 'Counter' }, count);
  //   return <div className='Counter'>{count}</div>;
}
