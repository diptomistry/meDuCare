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


//export default DutyRoster
import React, { useState } from "react";
import Logo from "../assets/logo.png";


const DutyRosterNav = () => {

  return (
    <div>
    

<nav class="bg-backgroundColor border-gray-200 ">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={Logo} class="h-12 w-12  mr-4" alt="DU"  />
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">DU HEALTHCARE</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class=" w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-2 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
       
        <li>
          <a href="#" class="block py-2 px-3 rounded text-brightColor hover:bg-hoverColor md:hover:bg-transparent md:border-0 md:hover:text-hoverColor md:p-0 "> Doctor Schedule</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-brightColor rounded hover:bg-hoverColor md:hover:bg-transparent md:border-0 md:hover:text-hoverColor md:p-0 ">Namaz Schedule</a>
        </li>
       
      </ul>
    </div>
  </div>
</nav>


    </div>
  )
}

export default DutyRosterNav