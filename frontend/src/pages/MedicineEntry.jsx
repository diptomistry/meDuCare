import React from 'react'

const MedicineEntry = () => {
  return (
    <div className='container flex flex-col mx-auto p-4 bg-backgroundColor/50 mt-5 shadow-lg rounded-md w-1/2'>
      <h3 className="text-lg font-semibold mb-2">Medicine Entry</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
          <input
            type="text"
            className="mt-1 block w-full border border-backgroundColor rounded-md px-3 py-2"
            placeholder="Enter medicine name"
          />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              className="mt-1 block w-full border border-backgroundColor rounded-md px-3 py-2"
            >
                <option>Select Category</option>
                <option>Tablet</option>
                <option>Syrup</option>
                <option>Capsule</option>
                <option>Injection</option>
            </select>

        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            className="mt-1 block w-full border border-backgroundColor rounded-md px-3 py-2"
            placeholder="Enter total quantity"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="mt-1 block w-full border border-backgroundColor rounded-md px-3 py-2"
            placeholder="Enter date"
          />
        </div>
       
       
      </div>
      <button className="mt-4 bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out ">
        Add Entry
        </button>
    </div>
  )
}

export default MedicineEntry