

import React from 'react';
export const SearchResult = ({ result, onSelect }) => {
  return (
    <div className="search-result text-black" onClick={onSelect}>
      {result}
    </div>
  );
};

