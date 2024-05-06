
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStartedPage from "./GetStartedPage";

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

import RequireAuth from "./auth/ProtectedRoute.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import CreateSlot from "./pages/public/DutyRoster/CreateSlot.jsx";
import AssignSlots from "./pages/public/DutyRoster/AssignDuty.jsx";
function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRootLayout />} />
       
    

        <Route path="/login" element={<GetStartedPage />} />
        <Route path="/create-account" element={<RegistartionForm />} />
      
        <Route path="/admin" element={<RequireAuth><AdminRootLayout /></RequireAuth>} >
         
          <Route path="Users/Approve" element={<ApproveUser />} />
          
          </Route>

        <Route path="/dashboard/admin" element={<RequireAuth><RootLayout /></RequireAuth>}>
          <Route path="allApps" element={<Prescribe />} />
          <Route path="authentication" element={<AppointmentData />} />
          <Route path="duty-roster/slots" element={<CreateSlot />} />
          <Route path="duty-roster/assign-slot" element={<AssignSlots />} />
          <Route path="stroage" element={<Stroage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="public-info/gallery" element={<PhotoUpload />} />
          <Route path="analytics/:aID" element={<Analytics />} />
          <Route path="public-info/department" element={<DepartmentManage />} />
              <Route path="public-info/notice" element={<NoticeManagement />} />
        </Route>
      </Routes>
     
    </BrowserRouter>
   
  );
}

export default App;
