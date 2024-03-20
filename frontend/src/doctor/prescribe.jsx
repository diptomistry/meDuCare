import React from "react";
import styles, { layout } from "../style";

const Prescribe = () => {
  return (
    <div class="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md px-6 py-4">
      <div class="flex justify-between items-center mb-4">
        <h2 className={`${styles.heading2} sm:text-lg md:text-xl`}>
          Prescription
        </h2>

        <span class="text-sm text-gray-500">
          Issued on: <span class="font-medium">April 15, 2023</span>
        </span>
      </div>

      <div class="mb-4 flex justify-center">
        <div class="flex">
          <div class="mr-4">
            <p class="text-sm text-gray-600">Name</p>
            <p className={`text-primary-400`}>John Doe</p>
          </div>
          <div class="mr-4">
            <p class="text-sm text-gray-600">Age</p>
            <p className={`text-primary-400`}>35</p>
          </div>
          <div class="mr-4">
            <p class="text-sm text-gray-600">Gender</p>
            <p className={`text-primary-400`}>Male</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Past History</p>
            <p class="text-primary-100">N/A</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
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
