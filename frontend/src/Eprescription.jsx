
// import React, { useState } from 'react';

// const Eprescription = () => {
//   const [dosageForm, setDosageForm] = useState('Capsule(s)');
//   const [routeOfAdministration, setRouteOfAdministration] = useState('Orally');
//   const [duration, setDuration] = useState(1);
//   const [durationUnit, setDurationUnit] = useState('Week(s)');
//   const [frequency, setFrequency] = useState('Daily');
//   const [intake, setIntake] = useState('After Food');
//   const [morning, setMorning] = useState(0);
//   const [noon, setNoon] = useState(0);
//   const [evening, setEvening] = useState(0);
//   const [night, setNight] = useState(1);
//   const [daily, setDaily] = useState(0);

//   const totalCapsules = morning + noon + evening + night + daily;

//   return (
//     <div className="bg-white  rounded-lg shadow-md p-6 mx-auto m-5 lg:m-10">
//       <h2 className="text-xl font-bold mb-4">Sporanox Capsule 4's</h2>
//       <div className="mb-4">
//         <label className="block font-bold mb-2">Contains:</label>
//         <p className="text-gray-600">ITRACONAZOLE (100 MG)</p>
//       </div>
//       {/* Dosage form, route of administration, duration */}
//       {/* Frequency, intake */}
//       {/* Morning, noon, evening, night, daily quantities */}
//       <div className="mt-6">
//         <p className="text-gray-600">
//           Take {night} capsule(s) in the night after food for {duration} {durationUnit}
//         </p>
//         <p className="text-gray-600">To be taken: {routeOfAdministration}</p>
//       </div>
//       <div className="mt-6 flex justify-between items-center">
//         <p className="text-gray-600">Total {totalCapsules} Capsules</p>
//         <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">
//           ADD MEDICINE
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Eprescription;