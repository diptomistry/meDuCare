import React, { useState } from "react";
import IncrementDecrementBtn from "./IncrementDecrementBtn";
import Button from "../../layouts/Button";
import { SearchResultsList } from "./MedicineSearch/SearchResultsList";
import { SearchResult } from "./MedicineSearch/SearchResult";
import { FaTrashAlt } from 'react-icons/fa';


const DrugPrescription = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Days");
  const [beforeFood, setBeforeFood] = useState(false);
  const [afterFood, setAfterFood] = useState(false);

  const options = ["Days", "Weeks", "Months", "Till Next Review"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
    setShowMenu(true);
  };
  const [selectedItems, setSelectedItems] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleItemSelect = (item) => {
    setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    setShowMenu(false);
    setInput("");
  };
  const handleItemDelete = (index) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((_, i) => i !== index)
    );
  };
  const [dutation, setDuration] = useState(0);
  const handleDuration = (value) => {
    setDuration(value);
  }
 

  return (
    <div className="bg-blue-200 rounded-lg p-5 mt-5">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold  flex mt-2">Drug Prescription</h3>
        <form className="max-w-md  ">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>

            <input
              type="search"
              id="default-search"
              className="block w-full mb-2 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Medicine..."
              required
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        </form>
      </div>
      {/* Add form fields or components for drug prescription details */}
      <div className="mb-4">
        {showMenu && results.length > 0 && (
          <SearchResultsList
            results={results}
            onItemSelect={handleItemSelect}
          />
        )}
        <div className=" bg-backgroundColor/10">
          
           
              {selectedItems.length > 0 && (
                <div className="">
                  {selectedItems.map((item, index) => (
                    <div key={index} className="">
                      <div className="flex">
                        <div className="w-1/4">
                        <span>
                          {index + 1}. {item}
                        </span>
                        <button
                          className="  "
                          onClick={() => handleItemDelete(index)}
                        >
                          Delete
                        </button>
                            </div>
                        <div className="grid grid-cols-5 grid-rows-1 gap-2 flex-1 ">
                          <div>
                            <h1>Quantity</h1>
                          </div>
                          <div>
                            <h1>Frequency</h1>
                          </div>
                          <div>
                            <h1>Duration</h1>
                          </div>
                          <div>
                            <h1>Instructions</h1>
                          </div>
                          <button
                          className="  "
                          onClick={() => handleItemDelete(index)}
                        >
                       
                            <FaTrashAlt/>
                         
                        </button>
                        
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            
          
        </div>
      </div>
      <div className="grid grid-cols-6 grid-rows-1 gap-4 bg-backgroundColor/10">
        <div className="grid-cols-1 grid-rows-2 gap-2 ">
          <h1>Morning</h1>
          <IncrementDecrementBtn index={0} />
        </div>
        <div className="grid-cols-1 grid-rows-2 gap-2 ">
          <h1>Noon</h1>
          <IncrementDecrementBtn index={1} />
        </div>
        <div className="grid-cols-1 grid-rows-2 gap-2 ">
          <h1>Night</h1>
          <IncrementDecrementBtn index={2} />
        </div>
        <div className="grid-cols-1 grid-rows-2 gap-2 ">
          <div className="flex gap-1 mb-1">
            <h1>Duration</h1>
            <div className="relative inline-block ml-1">
              <button
                className="border text-sm text-teal-700  font-semibold  rounded inline-flex items-center"
                onClick={toggleDropdown}
              >
                <span>{selectedOption}</span>
                <svg
                  className="ml-2 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-10">
                  {options.map((option) => (
                    <button
                      key={option}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        option === selectedOption ? "bg-gray-200" : ""
                      }`}
                      onClick={() => selectOption(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        <input
            type="number"
            className="w-[120px] h-8 text-center bg-teal-600 text-white font-bold border border-white mx-2 rounded-lg"
             value={dutation}
            onChange={(e) => handleDuration(e.target.value)}
        />
        </div>
        <div className="mt-2">
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="beforeFood"
              checked={beforeFood}
              onChange={(e) => setBeforeFood(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="beforeFood">Before Food</label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="afterFood"
              checked={afterFood}
              onChange={(e) => setAfterFood(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="afterFood">After Food</label>
          </div>
        </div>

        <button>
          <Button title="Add to Medicine" />
        </button>
      </div>

      {/* Add more fields as needed */}
    </div>
  );
};

export default DrugPrescription;
