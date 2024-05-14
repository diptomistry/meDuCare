import React, { useState, useEffect } from 'react';
import Button from '../layouts/Button';


const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-appointments');
        const data = await response.json();
        if (data.success) {
          setAppointments(data.data.map(appointment => ({
            ...appointment,
            // Split AppointmentDateTime into date and time components
            splitDate: appointment.AppointmentDateTime.split('T')[0],
            splitTime: appointment.AppointmentDateTime.split('T')[1].slice(0, -5), // Remove Z and milliseconds
          })));
        } else {
          setError('Failed to fetch appointments');
        }
      } catch (error) {
        setError('An error occurred while fetching appointments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Recent Appointments</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Patient Name</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Prescription</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.AppointmentId} className="border-b">
              <td className="px-4 py-2">{appointment.UserName}</td>
              <td className="px-4 py-2">{appointment.splitDate}</td>
              <td className="px-4 py-2">{appointment.splitTime}</td>
              <td className="px-4 py-2">{appointment.UserPhone}</td>
              <td className="px-4 py-2">
                {appointment.Status === 'Pending' ? (
                  <span className="bg-blue-500 text-white rounded py-1 px-2">
                    {appointment.Status}
                  </span>
                ) : appointment.Status === 'Pending' ? (
                 
                  <Button title={'Prescribe'}></Button>
                ) : (
                    <Button title={'Prescribe'}></Button>
                )}
              </td>
              <td className="px-4 py-2">
                {appointment.Status==="Pending" ? <Button title={'Prescribe'}></Button> : <Button title={'View'}></Button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
