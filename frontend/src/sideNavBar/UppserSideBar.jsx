import React from 'react';

const UpperSideBar = () => {
  return (
    <div className="flex items-center justify-between h-16 bg-slate-200 px-4">
      <div className="flex items-center">
        <span className="text-lg font-semibold mr-4">Welcome to Dashboard</span>
        {/* Replace with your profile picture component or image */}
        <img src="path/to/profile-picture.jpg" alt="Profile Picture" className="w-10 h-10 rounded-full" />
      </div>
      <div className="flex-grow">
        {/* Replace with your search component */}
        <input type="text" className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500" placeholder="Search..." />
      </div>
      <span className="text-base font-medium">{/* Replace with username */}</span>
    </div>
  );
};

export default UpperSideBar;
