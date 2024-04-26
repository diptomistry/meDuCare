import React from 'react'
import ScheduleTable from '../models/ScheduleTable '


const DoctorsSchedule = () => {
    const scheduleData = [
      {
        doctors: ['Dr. Evelyn Santos', 'Dr. Katrina Tan',],
        designation:['Transplant Specialist', 'ad'],
        day: 'MONDAY',
        times: ['8 am - 12 nn', '1 pm - 3 pm']
      },
      {
        doctors: ['Dr. Dinah Sia Tan', 'Dr. Rhea Salvador'],
        designation:['ad'],
        day: 'TUESDAY',
        times: ['8 am - 12 nn', '1 pm - 3 pm']
      },
      {
        doctors: ['Dr. Dinah Sia Tan', 'Dr. Rhea Salvador'],
        designation:['ad'],
        day: 'TUESDAY',
        times: ['8 am - 12 nn', '1 pm - 3 pm']
      },
      // Add more schedule data objects as needed
    ];
  
    return (
      <div className="container mx-auto p-4 min-h-screen">
        <ScheduleTable scheduleData={scheduleData} />
      </div>
    );
      };
  

export default DoctorsSchedule
// import React from 'react'
// import ScheduleTable from './ScheduleTable ';

// const DutyRoster = () => {
//   const scheduleData = [
//     {
//       doctors: ['Dr. Evelyn Santos', 'Dr. Katrina Tan',],
//       designation:['Transplant Specialist', 'ad'],
//       day: 'MONDAY',
//       times: ['8 am - 12 nn', '1 pm - 3 pm']
//     },
//     {
//       doctors: ['Dr. Dinah Sia Tan', 'Dr. Rhea Salvador'],
//       designation:['ad'],
//       day: 'TUESDAY',
//       times: ['8 am - 12 nn', '1 pm - 3 pm']
//     },
//     {
//       doctors: ['Dr. Dinah Sia Tan', 'Dr. Rhea Salvador'],
//       designation:['ad'],
//       day: 'TUESDAY',
//       times: ['8 am - 12 nn', '1 pm - 3 pm']
//     },
//     // Add more schedule data objects as needed
//   ];

//   return (
//     <div className="container mx-auto p-4 mt-10">
//       <ScheduleTable scheduleData={scheduleData} />
//     </div>
//   );
//     };
