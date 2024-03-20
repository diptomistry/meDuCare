import Home from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStartedPage from "./GetStartedPage";
import Doctor from "./doctor.jsx"
import Prescribe from "./doctor/prescribe"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/get-started/doctor" element={<Doctor />} />
        <Route path="/get-started/doctor/prescribe" element={<Prescribe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
