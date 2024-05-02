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
  console.log(user);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-slate-200 py-2 px-4">
    {/* Conditional rendering based on user role */}
    {user.role === 'admin' && (
        <a href="#" className="text-lg  mr-4 mb-2 md:mb-0 hover:text-blue-500">
            Dashboard
        </a>
    )}

    {/* Search button */}
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
            {/* <img
                className="w-10 h-10 rounded "
                src={user.image}
                alt="user photo"
            /> */}
            
        </button>
       
<div class="flex items-center gap-4 mr-2">
    <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""/>
    <div class="font-medium dark:text-backgroundColor">
        <div>Jese Leos</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
    </div>
</div>



    </div>
</div>

  );
};

export default Nav;
