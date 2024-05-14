import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../../auth/AuthContext';
import CustomDialog from './acceptModal';

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const doctorId = user.user_id;
  const [open, setOpen] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);

  const handlePrescribe = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/accept-appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentId,
          doctorId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('Prescription accepted successfully');
      } else {
        console.error('Failed to accept appointment:', data.message);
      }
    } catch (error) {
      console.error('An error occurred while accepting appointment:', error);
    }
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-appointments');
        const data = await response.json();
        if (data.success) {
          setAppointments(data.data.map(appointment => ({
            ...appointment,
            splitDate: appointment.AppointmentDateTime.split('T')[0],
            splitTime: appointment.AppointmentDateTime.split('T')[1].slice(0, -5),
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
      <CustomDialog open={open} handleAnotherClose={() => handlePrescribe(appointmentId)} setOpen={setOpen} title={"Accept Appointment"} body={"Your are going to prescribe this patient."} 
      buttonName={"Accept"}
      handleClose={
        () => {
          setOpen(false);
        }
      }

      />
      <h2 className="text-xl font-bold mb-4">Recent Appointments</h2>
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
                {
                // appointment.Status === 'Pending' ?
                 (
                  <span className="bg-blue-500 text-white rounded py-1 px-2">{appointment.Status}</span>
                ) 
                // :
                //  (
                //   <Button onClick={() => {
                //     console.log(appointment.AppointmentId);
                //     setOpen(true);
                //     setAppointmentId(appointment.AppointmentId);
                //   }} variant="contained" color="primary">View</Button>
                // )
                }
              </td>
              <td className="px-4 py-2">
                {appointment.Status === "Pending" ? (
                  <Button title={'Prescribe'} variant="contained" color="primary" onClick={
                    () => {
                      console.log(appointment.AppointmentID);
                      setOpen(true);
                      setAppointmentId(appointment.AppointmentID);
                    }
                  }>Prescribe</Button>
                ) : (
                  <Button title={'View'} variant="contained" color="primary">View</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;