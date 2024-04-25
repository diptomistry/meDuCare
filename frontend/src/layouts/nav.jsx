import React, { useState } from "react";
import meduCareLogo from "../assets/meducareLogin.png";

const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex">
      {/* Other content or components */}
      <div className="ml-auto mr-10 mt-5 relative">
        <button
          type="button"
          className={`flex text-sm bg-gray-100 rounded-full focus:ring-2 ${
            dropdownOpen && "focus:ring-hoverColor"
          }`}
          id="user-menu-button"
          aria-expanded={dropdownOpen}
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-10 h-10 rounded-full"
            src={meduCareLogo}
            alt="user photo"
          />
        </button>
        {dropdownOpen && (
          <div className="z-50 absolute right-0 mt-2 text-base list-none bg-backgroundColor divide-y divide-gray-100 rounded-lg shadow ">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 ">Bonnie Green</span>
              <span className="block text-sm text-gray-500 truncate ">
                name@gmail.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 "
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
