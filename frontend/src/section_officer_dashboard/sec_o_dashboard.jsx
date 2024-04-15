// SecDashBoard.js
import React from 'react';
import { connect } from 'react-redux';
import { toggleAddMedicineForm } from './medicineState/actions';
import SideBar from '../sideNavBar/sideBar.jsx';
import AddNewMedicine from '../section_officer_dashboard/addNewMedicine.jsx';
import UpperSideBar from '../sideNavBar/UppserSideBar.jsx';


const SecDashBoard = ({ showAddMedicineForm, toggleAddMedicineForm }) => {
    return (
      <div className="px-10 bg-slate-50 d-flex">  
  
        <SideBar />  
  
        <div className="flex-grow d-flex flex-column ml-60 mb-0  mt-0"> 
        <UpperSideBar />
          {showAddMedicineForm && <AddNewMedicine />}  
        </div>
      </div>
    );
  };
  
const mapStateToProps = (state) => ({
  showAddMedicineForm: state.showAddMedicineForm,
});

const mapDispatchToProps = {
  toggleAddMedicineForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(SecDashBoard);
