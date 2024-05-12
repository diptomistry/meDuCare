import React from "react";
import PatientDetails from "./PatientDetails";
import DrugPrescription from "./DrugPrescription";
import AddInstructions from "./AddInstructions ";
import Button from "../../layouts/Button";

const Root = () => {
  return (
    <div className="container flex flex-col mx-auto p-4 bg-backgroundColor/50 mt-5 shadow-lg rounded-md">
      <PatientDetails />
      <DrugPrescription />
      <AddInstructions />
      <button className=" mt-2 bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out ">
        Send Prescription
      </button>
    </div>
  );
};

export default Root;