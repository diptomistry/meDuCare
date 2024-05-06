import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignSlots = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);

    useEffect(() => {
        // Fetch doctors on component mount
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users/get-doctors');
            console.log(response.data);
            setDoctors(response.data.data);
        } catch (error) {
            console.error('Failed to fetch doctors:', error);
        }
    };

    const handleDoctorChange = (e) => {
        setSelectedDoctor(e.target.value);
    };

    const handleSlotChange = (e, slotId) => {
        if (e.target.checked) {
            setSelectedSlots([...selectedSlots, slotId]);
        } else {
            setSelectedSlots(selectedSlots.filter(id => id !== slotId));
        }
    };

    const handleAssignSlots = async () => {
        try {
            // Make API call to assign slots to the selected doctor
            const response = await axios.post('/api/public/duty-roster', {
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
            <h1 className="text-2xl font-semibold mb-4">Assign Slots to Doctor</h1>
            <div className="flex space-x-4 mb-4">
                <label htmlFor="doctor" className="text-sm font-medium">Select Doctor:</label>
                <select id="doctor" className="px-3 py-2 border rounded-md" onChange={handleDoctorChange}>
                    <option value="">Select Doctor</option>
                    {doctors.map(doctor => (
                        <option key={doctor.DoctorID} value={doctor.DoctorID}>{`${doctor.FirstName} ${doctor.LastName}`}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-wrap space-x-4">
                {/* Display available slots */}
                {/* You can replace availableSlots with actual data */}
                {availableSlots.map(slot => (
                    <div key={slot.SlotID} className="flex items-center space-x-2">
                        <input type="checkbox" id={`slot-${slot.SlotID}`} onChange={(e) => handleSlotChange(e, slot.SlotID)} />
                        <label htmlFor={`slot-${slot.SlotID}`}>{`${slot.StartTime} - ${slot.EndTime}`}</label>
                    </div>
                ))}
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleAssignSlots}>Assign Slots</button>
        </div>
    );
};

export default AssignSlots;
