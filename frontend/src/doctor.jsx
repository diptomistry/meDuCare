import React, { useState } from "react";
import Sidebar from "./doctor/sidebar"; // Import your sidebar component here

const Doctor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex  flex-col h-screen">
      {/* Div occupying 10% of the available space */}
      <div className="h-20 bg-white border-gray-200 dark:bg-gray-900 p-6">
        <nav class="flex items-center justify-between flex-wrap ">
          <div className="fixed top-0 left-0 p-4">
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none focus:bg-gray-600 rounded-lg p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </nav>
      </div>
      {/* Div occupying 90% of the available space */}
      <div className="flex-1 bg-gray-400 flex items-center justify-center">
        <div class="flex flex-col max-w-md p-6 dark:bg-gray-900 dark:text-gray-100">
          <img
            src="https://source.unsplash.com/200x200/?portrait?2"
            alt=""
            class="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 dark:bg-gray-500 aspect-square"
          />
          <div>
            <h2 class="text-xl font-semibold">Leroy Jenkins</h2>
            <span class="block pb-2 text-sm dark:text-gray-400">
              CTO of Company Inc.
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
              non deserunt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
