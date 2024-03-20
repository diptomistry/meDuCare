import React from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white ${isOpen ? 'block' : 'hidden'}`}>
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-white focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Sidebar Content */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <a href="/get-started/doctor/prescribe" className="block p-2 hover:bg-gray-700">Prescribe</a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-700">Add Account</a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-700">Log Out</a>
          </li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
