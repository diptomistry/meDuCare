import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateSlot = () => {
    // State for doctors
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    
    // State for slots
    const [slots, setSlots] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);

    // State for selected slots
    const [selectedSlots, setSelectedSlots] = useState([]);

    // Fetch doctors and slots on component mount
    useEffect(() => {
        fetchDoctors();
        fetchSlots();
    }, []);

    // Function to fetch doctors
    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/doctors/get-doctors');
            setDoctors(response.data.data);
        } catch (error) {
            console.error('Failed to fetch doctors:', error);
        }
    };

    // Function to fetch slots
    const fetchSlots = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/public/duty/slots');
            setSlots(response.data.slots);
        } catch (error) {
            console.error('Failed to fetch slots:', error);
        }
    };

    // Function to handle doctor selection
    const handleDoctorChange = (e) => {
        setSelectedDoctor(e.target.value);
    };

    // Function to handle slot selection
    const handleSlotChange = (e, slotId) => {
        if (e.target.checked) {
            setSelectedSlots([...selectedSlots, slotId]);
        } else {
            setSelectedSlots(selectedSlots.filter(id => id !== slotId));
        }
    };

    // Function to toggle selected days
    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    // Function to handle slot creation
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/public/duty/create-slot', {
                startTime,
                endTime,
                selectedDays
            });

            fetchSlots(); // Refresh the list of slots
            alert(response.data.message);
            setStartTime('');
            setEndTime('');
            setSelectedDays([]);
        } catch (error) {
            alert('Failed to create slot: ' + error.message);
        }
    };

    // Function to handle slot assignment to doctor
    const handleAssignSlots = async () => {
        try {
            // Make API call to assign slots to the selected doctor
            const response = await axios.post('http://localhost:8000/api/public/duty/assign-slot', {
                doctorId: selectedDoctor,
                slotIds: selectedSlots
            });
            console.log(response.data);
            // Optionally, handle success message or UI update
        } catch (error) {
            console.error('Failed to assign slots:', error);
            // Optionally, display error message to user
        }
    };

    return (
        <div className="container mx-auto p-4">
            {/* Assign Slots to Doctor */}
            <div className="mb-8">
    <h1 className="text-xl font-semibold mb-4">Assign Slots to Doctor</h1>
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Doctor Selection */}
        <div className="flex-grow">
            <label htmlFor="doctor" className="block text-sm font-medium mb-2">Select Doctor:</label>
            <div className="relative">
                <select id="doctor" className="w-full px-3 py-2 border rounded-md" onChange={handleDoctorChange}>
                    <option value="">Select Doctor</option>
                    {doctors.map(doctor => (
                        <option key={doctor.DoctorID} value={doctor.DoctorID}>{`${doctor.Name}`}</option>
                    ))}
                </select>
                
            </div>
        </div>
        {/* Doctor Name */}
        {selectedDoctor && (
            <div>
                <span className="text-lg font-medium">Selected Doctor:</span>
                <span className="ml-2">{doctors.find(doctor => doctor.DoctorID === selectedDoctor)?.Name}</span>
            </div>
        )}
    </div>



    <div className="mb-8">
    <h1 className="text-2xl font-semibold mb-4">Available Slots</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Display available slots with days */}
        {slots.map(slot => (
            <div key={slot.SlotID} className="bg-white rounded-md shadow-md p-4">
                <div className="flex items-center space-x-2 mb-2">
                    <input type="checkbox" id={`slot-${slot.SlotID}`} onChange={(e) => handleSlotChange(e, slot.SlotID)} />
                    <label htmlFor={`slot-${slot.SlotID}`}>{`${slot.StartTime} - ${slot.EndTime}`}</label>
                </div>
                <div className="text-sm text-gray-500">
                    <span>Days: {slot.Days.join(', ')}</span>
                </div>
            </div>
        ))}
    </div>
</div>

                <button className="mt-4 px-4 py-2 bg-backgroundColor text-white rounded-md" onClick={handleAssignSlots}>Assign Slots</button>
            </div>

            {/* Create a New Slot */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Create a New Slot</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input type="time" id="startTime" className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                        <input type="time" id="endTime" className="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Select Days</h2>
                        <div className="flex space-x-4">
                            {/* Checkbox for each day */}
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                <label key={day} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox text-indigo-600 h-5 w-5"
                                        checked={selectedDays.includes(day)}
                                        onChange={() => toggleDay(day)}
                                    />
                                    <span className="ml-2">{day}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="mt-4 px-4 py-2 bg-backgroundColor text-white rounded-md">Create Slot</button>
                </form>
            </div>
        </div>
    );
};

export default CreateSlot;
