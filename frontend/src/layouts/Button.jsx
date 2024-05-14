import React from "react";

const Button = ({ title, onClick }) => {
  const handleClick = () => {
    console.log("clicked");
    onClick(); // Call the onClick function passed from props
  };

  return (
    <div>
      <button
        onClick={handleClick} // Use handleClick as the onClick handler
        className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
