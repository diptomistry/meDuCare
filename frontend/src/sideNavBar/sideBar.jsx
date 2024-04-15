import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { toggleAddMedicineForm } from '../section_officer_dashboard/medicineState/actions.jsx';

const SideBar = ({ toggleAddMedicineForm }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`fixed inset-y-0 left-0 w-1/4 md:w-1/5 lg:w-1/6 bg-gray-800 overflow-y-auto ${isSidebarOpen ? '' : 'hidden'}`}>
      <div className="flex items-center justify-between h-16 bg-gray-700 border-b border-gray-600">
        <span className="text-white text-lg font-bold px-4">Sidebar</span>
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-white px-4 focus:outline-none md:hidden">
          {isSidebarOpen ? (
            <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 7.586l-3.293-3.293a1 1 0 00-1.414 1.414L6.586 9l-3.293 3.293a1 1 0 001.414 1.414L8 10.414l3.293 3.293a1 1 0 001.414-1.414L9.414 9l3.293-3.293a1 1 0 00-1.414-1.414L8 7.586z"/>
            </svg>
          ) : (
            <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.707 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 11-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"/>
            </svg>
          )}
        </button>
      </div>
      <div className="p-4">
        <ul className="mt-6">
        <li className="mb-2 rounded-lg px-3 py-2 bg-gray-700 hover:bg-gray-600 flex items-center">
  <svg className="h-6 w-6 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
    <path fill="#FFFFFF" d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"></path>
  </svg>
  <a href="#" className="block text-white hover:text-blue ">Home</a>
</li>

          <li className="mb-2 rounded-lg px-3 py-2 bg-gray-700 hover:bg-gray-600 flex items-center">
            <svg className="h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 11-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
            <a href="#" className="block text-white hover:text-blue ">About</a>
          </li>
          <li className="mb-2 rounded-lg px-3 py-2 bg-gray-700 hover:bg-gray-600 flex items-center">
          <img height={30} width={30} color='#0xffffff'  src="https://img.icons8.com/ios/50/add--v1.png" alt="add--v1"/>
  {/* Use a button with onClick event to trigger the action */}
  <button onClick={toggleAddMedicineForm} className="block text-white hover:text-blue">Add Medicine</button>
</li>

          <li className="mb-2 rounded-lg px-3 py-2 bg-gray-700 hover:bg-gray-600 flex items-center">
            <svg className="h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 11-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
            <a href="#" className="block text-white hover:text-blue ">Services</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
const mapDispatchToProps = {
  toggleAddMedicineForm
};

export default connect(null, mapDispatchToProps)(SideBar);

