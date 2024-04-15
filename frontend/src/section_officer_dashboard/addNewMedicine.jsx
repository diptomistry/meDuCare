import React, { useState } from 'react';

const AddNewMedicine = () => {
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission logic, such as sending a request to the server to add the new medicine
    console.log('Medicine Name:', medicineName);
    console.log('Quantity:', quantity);
    console.log('Expiry Date:', expiryDate);
    // Reset the form fields after submission
    setMedicineName('');
    setQuantity('');
    setExpiryDate('');
  };

  return (
    <div className=" w-full h-full overflow-auto">  
      <h1 className="text-2xl font-semibold mb-6">Add New Medicine</h1>
      <div className=" flex-grow bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Medicine</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700">Medicine Name</label>
            <input
              type="text"
              id="medicineName"
              className="form-input mt-1 block w-full rounded-md border shadow-sm border-gray-300"  // Added shadow-sm
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              className="form-input mt-1 block w-full rounded-md border shadow-sm border-gray-300"  // Added shadow-sm
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              className="form-input mt-1 block w-full rounded-md border shadow-sm border-gray-300"  // Added shadow-sm
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewMedicine;
