import React from "react";
import { Link } from "react-scroll";
import Logo from "../assets/logo.png";

const DutyRosterNav = () => {
  return (
    <div className="fixed w-full z-10 " >
      <nav className="bg-backgroundColor border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-12 w-12  mr-4" alt="DU" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">DU HEALTHCARE</span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-2 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
              <li>
                <Link
                  to="doctor-schedule"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="block cursor-pointer py-2 px-3 rounded text-brightColor hover:bg-hoverColor md:hover:bg-transparent md:border-0 md:hover:text-hoverColor md:p-0"
                >
                  Doctor Schedule
                </Link>
              </li>
              <li>
                <Link
                  to="namaz-schedule"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="block cursor-pointer py-2 px-3 text-brightColor rounded hover:bg-hoverColor md:hover:bg-transparent md:border-0 md:hover:text-hoverColor md:p-0"
                >
                  Namaz Schedule
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DutyRosterNav;
