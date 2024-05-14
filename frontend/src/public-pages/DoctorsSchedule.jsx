import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleTable from '../models/ScheduleTable .jsx';

const DoctorsSchedule = () => {
  // State to store schedule data
  const [scheduleData, setScheduleData] = useState([]);

  // Fetch schedule data from the API on component mount
  useEffect(() => {
    fetchScheduleData();
  }, []);

  // Function to fetch schedule data from the API
  const fetchScheduleData = async () => {
    try {
      // Fetch data from the API
      const response = await axios.get('http://localhost:8000/api/public/duty/get-duty-roster');

      // Modify the structure of the API response
      const modifiedData = response.data.dutyRoster.map(doctor => ({
        doctors: [doctor.DoctorName], // Convert DoctorName to an array
        designation: [doctor.DepartmentName], // Placeholder for designation
        day: '', // Placeholder for day
        times: doctor.Slots.map(slot => `${slot.StartTime} - ${slot.EndTime}`), // Format slot times
      }));

      // Update state with modified data
      setScheduleData(modifiedData);
    } catch (error) {
      console.error('Failed to fetch schedule data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Pass scheduleData as a prop to the ScheduleTable component */}
      <ScheduleTable scheduleData={scheduleData} />
    </div>
  );
};

export default DoctorsSchedule;
