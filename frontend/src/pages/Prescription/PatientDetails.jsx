import React from 'react'
import Button from '../../layouts/Button';

const PatientDetails = ({ name = 'Unknown', sex = 'Unknown' }) => {
  
    return (
      <div className='bg-blue-200 rounded-lg p-5'>
     <div className='flex justify-between'>
     <h3 className="  text-lg font-semibold mb-2  ">Patient Details</h3>
     <button>
        <Button title='View Previous History' />
     </button>
     </div>
       <div className='flex justify-between md:px-[100px] mr-10'>
       <div className="mb-4 ">
          <label className="block font-medium">Name</label>
          <p className="text-gray-700">{name}</p>
        </div>
        <div className="mb-4">
          <label className="block font-medium">Age</label>
          <p className="text-gray-700">35</p>
        </div>
        <div className="mb-4">
          <label className="block font-medium">Gender</label>
          <p className="text-gray-700">{sex}</p>
        </div>
       </div>
      </div>
    );
  };

export default PatientDetails