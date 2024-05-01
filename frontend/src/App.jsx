// import Home from "./home";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import GetStartedPage from "./GetStartedPage";
// import Doctor from "./doctor.jsx";
// import Prescribe from "./doctor/prescribe";
// import Dash from "./dashboard.jsx";
// import RootLayout from "./layouts/RootLayout";
// import AllApps from "./pages/AllApps";
// import Analytics from "./pages/Analytics";
// import Authentication from "./pages/Authentication";
// import Build from "./pages/Build";
// import Settings from "./pages/Settings";
// import Stroage from "./pages/Stroage";

// import SecDashBoard from "./section_officer_dashboard/sec_o_dashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/get-started" element={<GetStartedPage />} />
//         <Route path="/dashboard" element={<SecDashBoard />} />

//         <Route path="/get-started/doctor" element={<RootLayout />}>
//           <Route path="allApps" element={<AllApps />} />
//           <Route path="authentication" element={<Authentication />} />
//           <Route path="stroage" element={<Stroage />} />
//           <Route path="settings" element={<Settings />} />
//           <Route path="build/:bID" element={<Build />} />
//           <Route path="analytics/:aID" element={<Analytics />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


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

import SecDashBoard from "./section_officer_dashboard/sec_o_dashboard";

import AdminRootLayout from "./adminDashLayout/AdminRootLayout.jsx";
import ApproveUser from "./adminDashLayout/pages/ApproveUser.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRootLayout />} />
       
    

        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/create-account" element={<RegistartionForm />} />
        <Route path="/dashboard" element={<SecDashBoard />} />
        <Route path="/admin" element={<AdminRootLayout />} >
          <Route path="Users/Approve" element={<ApproveUser />} />
          </Route>

        <Route path="/get-started/doctor" element={<RootLayout />}>
          <Route path="allApps" element={<Prescribe />} />
          <Route path="authentication" element={<AppointmentData />} />
          <Route path="stroage" element={<Stroage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="public-info/gallery" element={<PhotoUpload />} />
          <Route path="analytics/:aID" element={<Analytics />} />
          <Route path="public-info/department" element={<DepartmentManage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
