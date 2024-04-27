
import React from 'react';

const Stroage = () => {
  const appointments = [
    {
      id: 1,
      date: '27-02-2020',
      time: '3:00 PM',
      name: 'Karim Ahmed',
      contact: '+01700000000',
      prescription: 'View',
      status: 'Pending'
    },
    {
      id: 2,
      date: '27-02-2020',
      time: '3:00 PM',
      name: 'Karim Ahmed',
      contact: '+01700000000',
      prescription: 'Not Added',
      status: 'Pending'
    },
    {
      id: 3,
      date: '27-02-2020',
      time: '3:00 PM',
      name: 'Karim Ahmed',
      contact: '+01700000000',
      prescription: 'View',
      status: 'Approved'
    },
    {
      id: 4,
      date: '27-02-2020',
      time: '3:00 PM',
      name: 'Karim Ahmed',
      contact: '+01700000000',
      prescription: 'View',
      status: 'Pending'
    },
    {
      id: 5,
      date: '27-02-2020',
      time: '3:00 PM',
      name: 'Karim Ahmed',
      contact: '+01700000000',
      prescription: 'Not Added',
      status: 'Cancelled'
    },
    {
      id: 6,
      date: '27-02-2020',
      time: '3:00 PM',
      name: 'Karim Ahmed',
      contact: '+01700000000',
      prescription: 'View',
      status: 'Pending'
    }
  ];

  return (
    <div className="p-6">
      

      <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
      <div className="mb-4">
        <select className="py-2 px-4 border rounded-md">
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone Number</th>
            <th className="py-2 px-4 border">Type</th>
            <th className="py-2 px-4 border">Gender</th>
            <th className="py-2 px-4 border">DOB</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border">
              <td className="py-2 px-4 border">{appointment.id}</td>
              <td className="py-2 px-4 border">{appointment.date}</td>
              <td className="py-2 px-4 border">{appointment.time}</td>
              <td className="py-2 px-4 border">{appointment.name}</td>
              <td className="py-2 px-4 border">{appointment.contact}</td>
              <td className="py-2 px-4 border">{appointment.prescription}</td>
              <td className="py-2 px-4 border">
                {appointment.prescription === 'View' && (
                  <button className="bg-teal-500 text-white rounded-md py-1 px-2 mr-2">
                    View
                  </button>
                )}
                <button
                  className={`rounded-md py-1 px-2 ${
                    appointment.status === 'Pending'
                      ? 'bg-blue-500 text-white'
                      : appointment.status === 'Approved'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {appointment.status}
                </button>
                <button className="bg-yellow-500 text-white rounded-md py-1 px-2 ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stroage;