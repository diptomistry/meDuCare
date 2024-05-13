

import React from 'react';
export const SearchResult = ({ result, onSelect }) => {
  return (
    <div className=" text-gray-700 cursor-pointer px-10 py-1 hover:bg-hoverColor/70 border-[1px] border-backgroundColor " onClick={onSelect}>
      {result}
    </div>
  );
};

