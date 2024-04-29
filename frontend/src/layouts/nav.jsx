import React, { useState ,useEffect} from "react";
import axios from "axios";
import meduCareLogo from "../assets/meducareLogin.png";

const Nav = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/get-started";
    }
    const getLoggedInUser = async () => {
      // console.log(token);
      try{
        console.log(token);
       var response =await axios.post("http://localhost:8000/api/users",{}, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

        });
        console.log('token1');
        console.log(response.data);
        // const data = await response.data;
        // console.log(data);
        setUser(response.data.user);
      }
      catch (error) {
        console.log(user);
        console.log(error);
      }
    }
     getLoggedInUser();
    
  }, []);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-backgroundColor py-2 px-4">
    {/* Conditional rendering based on user role */}
    {user.role === 'admin' && (
        <a href="#" className="text-sm mr-4 mb-2 md:mb-0 hover:text-blue-500">
            Dashboard
        </a>
    )}

    {/* Search button */}
    <div className="flex flex-grow items-center mb-2 md:mb-0">
        <input
            type="text"
            placeholder="Search..."
            className="flex-grow text-sm px-4 py-2 rounded-l-lg focus:outline-none"
        />
        <button
            type="button"
            className="bg-gray-200 text-gray-800 px-4 rounded-r-lg hover:bg-gray-300"
        >
            Search
        </button>
    </div>

    {/* Profile section */}
    <div className="ml-auto flex items-center">
        <button
            type="button"
            className={`flex items-center text-sm bg-gray-100 rounded-full focus:ring-2 ${dropdownOpen ? "focus:ring-hoverColor" : ""}`}
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
            <span className="hidden md:block ml-2 text-gray-700">{user.name}</span>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
            <div className="z-50 absolute right-0 mt-2 text-base list-none bg-backgroundColor divide-y divide-gray-100 rounded-lg shadow">
                <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900">{user.name}</span>
                    <span className="block text-sm text-gray-500 truncate">
                        {user.email}
                    </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Settings
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Earnings
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
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
