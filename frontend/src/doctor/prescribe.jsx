import React from "react";
import styles, { layout } from "../style";

const Prescribe = () => {
  return (
    <div class="  rounded-lg shadow-md px-6 py-4">
      <div class="flex justify-between items-center mb-4">
        <h2 className={`${styles.heading2} sm:text-lg md:text-xl`}>
          Prescription
        </h2>

        <span class="text-sm text-gray-500">
          Issued on: <span class="font-medium">April 15, 2023</span>
        </span>
      </div>

      <form class="max-w-md mx-auto">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-bgOrange focus:border-bgOrangeDark "
            placeholder="Search with id..."
            required
          />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-bgOrange hover:bg-bgOrangeDark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </form>
      <div class="mt-4 mb-4 flex justify-center">
        <div class="flex">
          <div class="mr-4">
            <p class="text-sm text-gray-600">Name</p>
            <p className={`text-bgOrange`}>John Doe</p>
          </div>
          <div class="mr-4">
            <p class="text-sm text-gray-600">Age</p>
            <p className={`text-bgOrange`}>35</p>
          </div>
          <div class="mr-4">
            <p class="text-sm text-gray-600">Gender</p>
            <p className={`text-bgOrange`}>Male</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Past History</p>
            <p class="text-primary-300">N/A</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="medication"
          >
            Medication
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="medication"
            placeholder="Enter medication details"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="instructions"
          >
            Instructions
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            id="instructions"
            placeholder="Enter instructions for medication"
            rows="4"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-bgOrange hover:bg-bgOrangeDark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prescribe;
