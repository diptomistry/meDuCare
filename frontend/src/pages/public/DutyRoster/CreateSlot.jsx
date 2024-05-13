import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateSlot() {
  const [slots, setSlots] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
   var res = await axios.get('http://localhost:8000/api/public/duty/slots');
    setSlots(res.data.slots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    var res=  await axios.post('http://localhost:8000/api/public/duty/create-slot', { startTime, endTime,selectedDays });
    

      fetchSlots(); // Refresh the list of slots
      alert(res.data.message);
      setStartTime('');
      setEndTime('');
      setSelectedDays([]);
    } catch (error) {
      alert('Failed to create slot: ' + error.message);
    }
  };
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };


  return (
    <div className="flex flex-wrap md:flex-nowrap sm:flex-col ">
      {/* Slot Creation Form */}
      <div className="w-full md:w-1/2 p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold">Create a New Slot</h2>
          <div className=''>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
            <input type="time" id="startTime" className="mt-1 block w-full  rounded-md border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
            <input type="time" id="endTime" className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          </div>
          <div>
      <h2 className="text-lg font-semibold">Select Days</h2>
      <div className="flex space-x-4 mr-9 sm:flex-wrap">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600 h-5 w-5"
            checked={selectedDays.includes('Sunday')}
            onChange={() => toggleDay('Sunday')}
          />
          <span className="ml-2">Sunday</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600 h-5 w-5"
            checked={selectedDays.includes('Monday')}
            onChange={() => toggleDay('Monday')}
          />
          <span className="ml-2">Monday</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600 h-5 w-5"
            checked={selectedDays.includes('Tuesday')}
            onChange={() => toggleDay('Tuesday')}
          />
          <span className="ml-2">Tuesday</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600 h-5 w-5"
            checked={selectedDays.includes('Wednesday')}
            onChange={() => toggleDay('Wednesday')}
          />
          <span className="ml-2">Wednesday</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600 h-5 w-5"
            checked={selectedDays.includes('Thursday')}
            onChange={() => toggleDay('Thursday')}
          />
          <span className="ml-2">Thursday</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600 h-5 w-5"
            checked={selectedDays.includes('Friday')}
            onChange={() => toggleDay('Friday')}
          />
          <span className="ml-2">Friday</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600 h-5 w-5"
            checked={selectedDays.includes('Saturday')}
            onChange={() => toggleDay('Saturday')}
          />
          <span className="ml-2">Saturday</span>
        </label>
      </div>
      
    </div>
          <button type="submit" className="w-full bg-backgroundColor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
            Create Slot
          </button>
        </form>
      </div>

      {/* Slots Display */}
      <div className="w-full md:w-1/2 p-4">
      <h2 className="text-lg font-semibold">Existing Slots</h2>
      <div className="mt-2 bg-white shadow overflow-hidden rounded-md">
        <ul className="divide-y divide-gray-200">
          {slots.map((slot, index) => (
            <li key={index} className="px-4 py-4 flex flex-col">
              <div className="text-sm font-medium text-gray-900">{`Slot ${index + 1}: ${slot.StartTime} - ${slot.EndTime}`}</div>
              <div className="text-xs text-gray-500">Days: {slot.Days.join(', ')}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default CreateSlot;
