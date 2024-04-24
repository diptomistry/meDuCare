import Home from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStartedPage from "./GetStartedPage";
import Doctor from "./doctor.jsx";
import Prescribe from "./doctor/prescribe";
import Dash from "./dashboard.jsx";
import RootLayout from "./layouts/RootLayout";
import AllApps from "./pages/AllApps";
import Analytics from "./pages/Analytics";
import Authentication from "./pages/Authentication";
import Build from "./pages/Build";
import Settings from "./pages/Settings";
import Stroage from "./pages/Stroage";


import SecDashBoard from "./section_officer_dashboard/sec_o_dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/dashboard" element={<SecDashBoard />} />

        <Route path="/get-started/doctor" element={<RootLayout />}>
          <Route path="allApps" element={<AllApps />} />
          <Route path="authentication" element={<Authentication />} />
          <Route path="stroage" element={<Stroage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="build/:bID" element={<Build />} />
          <Route path="analytics/:aID" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
