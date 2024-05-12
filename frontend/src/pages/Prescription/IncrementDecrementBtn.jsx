import React, { useState } from "react";


const IncrementDecrementBtn = ({ minValue = 0, maxValue = 100, onCountChange, index}) => {
  const [count, setCount] = useState(minValue);

  const handleIncrementCounter = () => {
    if (count < maxValue) {
      const newCount = count + 1;
      onCountChange(newCount);
      setCount(newCount);
      
    }
  };

  const handleDecrementCounter = () => {
    if (count > minValue) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };
  

  return (
    <div className={`flex items-center justify-center rounded-md bg-teal-700 w-32`}>
      <button
        className="w-10 h-10 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center"
        onClick={handleDecrementCounter}
      >
        -
      </button>
      <div className="w-10 h-10 rounded-full bg-white text-teal-700 font-bold flex items-center justify-center mx-2">
        {count}
      </div>
      <button
        className="w-10 h-10 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center"
        onClick={handleIncrementCounter}
      >
        +
      </button>
    </div>
  );
};
export default IncrementDecrementBtn;