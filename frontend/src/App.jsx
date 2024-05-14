
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import GetStartedPage from "./GetStartedPage";

import Prescribe from "./doctor/prescribe";

import RootLayout from "./layouts/RootLayout";

import Analytics from "./pages/Analytics";

import PhotoUpload from "./pages/public/PhotoUpload.jsx";
import DepartmentManage from "./pages/public/Departments.jsx";
import Settings from "./pages/Settings";
import Stroage from "./pages/Stroage";
import HomeRootLayout from "./layouts/HomeRootLayout";
import AppointmentData from "./pages/AppointmentData.jsx";

import RegistartionForm from "./models/RegistrationForm.jsx";
import NoticeManagement from "./pages/public/Notice.jsx";



import AdminRootLayout from "./adminDashLayout/AdminRootLayout.jsx";
import ApproveUser from "./adminDashLayout/pages/ApproveUser.jsx";
import DoctorRootLayout from "./doctorDashLayout/DoctorRootLayout.jsx";
import SlidingLoginSignup from "./auth/LoginSignupPage/Root.jsx";
import Profile from "./role-based-access/Profile.jsx";


import RequireAuth from "./auth/ProtectedRoute.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import CreateSlot from "./pages/public/DutyRoster/CreateSlot.jsx";
// import AssignSlots from "./pages/public/DutyRoster/AssignDuty.jsx";


import Root from "./pages/Prescription/Root.jsx";
import MedicineEntry from "./pages/MedicineEntry.jsx";
import AddMedicine from "./role-based-access/senior-officer/AddMedicine.jsx";
import ShowMedicines from "./role-based-access/senior-officer/AllMedicines.jsx";
import RequestMedicine from "./role-based-access/dispensary/RequestMedicine.jsx";
import ViewStocks from "./role-based-access/dispensary/DIspensaryStocks.jsx";
import AppointmentTable from "./pages/Appointment.jsx";
import PrescriptionList from "./role-based-access/dispensary/AllPrescriptions.jsx";
function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRootLayout />} />
        <Route path="/login" element={<SlidingLoginSignup />} />
     
        <Route path="/eprescription" element={<Root />} />
        <Route path="/medicine" element={<MedicineEntry />} />
        <Route path="/doctor" element={<DoctorRootLayout />} />
        
       
    

      
        <Route path="/create-account" element={<RegistartionForm />} />
      
        <Route path="/admin" element={<RequireAuth><AdminRootLayout /></RequireAuth>} >
         
          <Route path="Users/Approve" element={<ApproveUser />} />
          
          </Route>

        <Route path="/dashboard" element={<RequireAuth><RootLayout /></RequireAuth>}>
          <Route path="allApps" element={<Prescribe />} />
          <Route path="authentication" element={<AppointmentData />} />
          <Route path="admin/duty-roster/slots" element={<CreateSlot />} />
          {/* <Route path="admin/duty-roster/assign-slot" element={<AssignSlots />} /> */}
          <Route path="admin/stroage" element={<Stroage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="admin/public-info/gallery" element={<PhotoUpload />} />
          <Route path="analytics/:aID" element={<Analytics />} />
          <Route path="admin/public-info/department" element={<DepartmentManage />} />
          <Route path="admin/public-info/notice" element={<NoticeManagement />} />
          <Route path="senior-officer/add-medicine" element={<AddMedicine/>}></Route>
          <Route path="senior-officer/medicines" element={<ShowMedicines/>}></Route>
          <Route path="dispensary/request-medicine" element={<RequestMedicine/>}></Route>
          <Route path="dispensary/stocks" element={<ViewStocks/>}></Route>
          <Route path="profile" element={<Profile/>}></Route>
          <Route path="doctor/prescription" element={<Root/>}></Route>
          <Route path="doctor/appointment" element={<AppointmentTable/>}></Route>
          <Route path="dispensary/all-prescriptions" element={<PrescriptionList/>}></Route>
          
        </Route>
      </Routes>
     
    </BrowserRouter>
   
  );
}

export default App;
