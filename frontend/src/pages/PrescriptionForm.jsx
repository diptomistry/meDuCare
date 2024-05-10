import React, { useState } from 'react';

const PrescriptionForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [morningDose, setMorningDose] = useState(false);
  const [afternoonDose, setAfternoonDose] = useState(false);
  const [nightDose, setNightDose] = useState(false);
  const [beforeFood, setBeforeFood] = useState(false);
  const [afterFood, setAfterFood] = useState(false);
  const [daysToTake, setDaysToTake] = useState(0);

  // Dummy data for medicines
  const medicines = [
    'Paracetamol',
    'Ibuprofen',
    'Amoxicillin',
    'Metformin',
    'Atorvastatin',
    // Add more medicines as needed
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicines((prevMedicines) => [...prevMedicines, medicine]);
  };

  const handleMedicineRemove = (medicine) => {
    setSelectedMedicines((prevMedicines) =>
      prevMedicines.filter((m) => m !== medicine)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      selectedMedicines,
      morningDose,
      afternoonDose,
      nightDose,
      beforeFood,
      afterFood,
      daysToTake,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <div className="mb-4">
        <label htmlFor="search" className="block font-medium mb-2">
          Search Medicines
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Search medicines..."
        />
        <ul className="mt-2">
          {medicines
            .filter((medicine) =>
              medicine.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((medicine) => (
              <li key={medicine} className="flex items-center mb-2">
                <button
                  type="button"
                  onClick={() => handleMedicineSelect(medicine)}
                  className="flex-grow px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {medicine}
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">Selected Medicines</label>
        <ul>
          {selectedMedicines.map((medicine) => (
            <li key={medicine} className="flex items-center mb-2">
              <span className="flex-grow px-3 py-2 bg-gray-200 rounded">
                {medicine}
              </span>
              <button
                type="button"
                onClick={() => handleMedicineRemove(medicine)}
                className="ml-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">Dosage Times</label>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="morningDose"
            checked={morningDose}
            onChange={(e) => setMorningDose(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="morningDose">Morning</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="afternoonDose"
            checked={afternoonDose}
            onChange={(e) => setAfternoonDose(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="afternoonDose">Afternoon</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="nightDose"
            checked={nightDose}
            onChange={(e) => setNightDose(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="nightDose">Night</label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">Before/After Food</label>
        <div className="flex items-center mb-2">
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

      <div className="mb-4">
        <label htmlFor="daysToTake" className="block font-medium mb-2">
          Days to Take
        </label>
        <input
          type="number"
          id="daysToTake"
          value={daysToTake}
          onChange={(e) => setDaysToTake(parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          min="1"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit Prescription
      </button>
    </form>
  );
};

export default PrescriptionForm;