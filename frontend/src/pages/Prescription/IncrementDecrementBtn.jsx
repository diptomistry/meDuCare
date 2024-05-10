import React, { useState } from "react";


const IncrementDecrementBtn = ({ minValue = 0, maxValue = 100 , index, customStyles}) => {
  const [count, setCount] = useState(minValue);

  const handleIncrementCounter = () => {
    if (count < maxValue) {
      setCount((prevState) => prevState + 1);
    }
  };

  const handleDecrementCounter = () => {
    if (count > minValue) {
      setCount((prevState) => prevState - 1);
    }
  };

  return (
    <div
      className={`flex items-center justify-center rounded-md  ${
        customStyles ? customStyles : "bg-teal-700 w-32"
      }`}
    >
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