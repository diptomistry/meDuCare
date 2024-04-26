import React from 'react';

const ScheduleTable = ({ scheduleData }) => {
  return (
    <div className="bg-backgroundColor/50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-4">DU HEALTHCARE SCHEDULE</h2>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full border border-green-800 rounded-lg">
                <thead className="bg-brightColor text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      DOCTOR'S NAME
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                    DESIGNATION
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      SCHEDULE
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      TIME
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-green-100' : 'bg-white'}>
<td className="px-6 py-4 font-medium text-gray-900 whitespace-pre-wrap">{item.doctors.join('\n')}</td>
                        <td className="px-6 py-4 text-gray-800  whitespace-pre-wrap">{item.designation.join('\n')}</td>
                      <td className="px-6 py-4 text-gray-800  whitespace-nowrap">{item.day}</td>
                      <td className="px-6 py-4 text-gray-800  whitespace-pre-wrap">{item.times.join('\n')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-green-800">For inquiries, please call +88 09666 911 463 (Ext. )</p>
    </div>
  );
};

export default ScheduleTable;