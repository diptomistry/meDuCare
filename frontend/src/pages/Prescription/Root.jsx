import React, { useState } from "react";
import PatientDetails from "./PatientDetails";
import DrugPrescription from "./DrugPrescription";
import AddInstructions from "./AddInstructions ";
import { useLocation } from 'react-router-dom';
const Root = () => {
  const location = useLocation();
  const { Name, Sex,age,prescription_id,appointmentId,doctorId } = location.state || {};
  console.log("appointmentId:",appointmentId,prescription_id);
  
  const [medicine, setMedicines] = useState([]);
 const getMedicines = (medicines) => {
  console.log("hereherer");
    console.log(medicines);
    setMedicines(medicines);
    console.log(medicine);
  }
  const tests="x-ray"
  
  const [instructions, setInstructions] = useState('');

  // Function to handle changes in the textarea value
  const handleInputChange = (event) => {
    setInstructions(event.target.value);
  };
  const handleSendPrescription = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/prescribe-medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appointmentId: appointmentId,
          doctorId: doctorId,
          medicines: medicine,
          instructions: instructions,
          tests: tests,
          prescription_id:prescription_id
        })
      });
      const data = await response.json();
      alert(data.message);
      console.log(data);
      // Handle success or error response from the API
    } catch (error) {
      console.error('Error sending prescription:', error);
    }
  };

  // Call the addInstruction function from props with the input data
  
  
  return (
    <div className="container flex flex-col mx-auto p-4 bg-backgroundColor/50 mt-5 shadow-lg rounded-md ml-5">
      <PatientDetails name={Name} sex={Sex} age={age} />
      <DrugPrescription  getMedicines={getMedicines} />
        <div className='bg-blue-200 rounded-lg p-5 mt-5 '>
        <h3 className="text-lg font-semibold mb-2">Add Instructions</h3>
        <textarea
          rows="4"
          className="border border-backgroundColor  rounded-md px-3 py-2 w-full"
          placeholder="Enter instructions or notes..."
          value={instructions}
        onChange={handleInputChange} 
        />
      </div>
      <button className=" mt-2 bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out "
    onClick={handleSendPrescription}
      >
        Send Prescription
      </button>
    </div>
  );
};

export default Root;
