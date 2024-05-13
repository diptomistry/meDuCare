import React, { useState ,useEffect} from "react";
import axios from "axios";
import meduCareLogo from "../assets/meducareLogin.png";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const Nav = () => {
  
  const { user, logout } = useAuth();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-200  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
            {user.role === 'admin' && (
        <a href="#" className="text-lg  mr-4 mb-2 md:mb-0 hover:text-blue-500">
            Dashboard
        </a>
    )}
            </div>
            <div className="flex flex-grow items-center mb-2 md:mb-0">
        <input
            type="text"
            placeholder="Search..."
            className="flex text-sm px-4 py-2 rounded-lg focus:outline-none mr-2"
        />
        <button
            type="button"
            className="bg-backgroundColor text-gray-100 px-4 rounded-lg hover:bg-gray-300 p-1"
        >
            Search
        </button>
    </div>
          </div>
          <div className="ml-auto flex items-center">
        <button
            type="button"
            className={`flex items-center text-sm bg-gray-100 rounded-full focus:ring-2 ${dropdownOpen ? "focus:ring-hoverColor" : ""}`}
            id="user-menu-button"
            aria-expanded={dropdownOpen}
            onClick={toggleDropdown}
        >
           
            
        </button>
       
<div class="flex items-center gap-4 mr-2">
    <img class="w-10 h-10 rounded-full" src={user.image} alt=""/>
    <div class="font-medium dark:text-backgroundColor">
        <div>{user.name}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
    </div>
</div>



    </div>
        </div>
      </div>
    </nav>

  );
};

export default Nav;
