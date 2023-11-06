import React from 'react';
import '../style/loading.scss'


function Loading() {
  const numberOfItems = 12;

  return (
    <div className='loadContainer'>
      <div className="loadingText">Loading</div>
      <ul className='loadingUl'>
        {Array.from({ length: numberOfItems }).map((_, i) => (
          <li key={i} style={{ '--delay': `${i * 0.1}s` }} className='loadingLi'></li>
        ))}
      </ul>
    </div>
  );
}

export default Loading;