import Home from "./home";
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import GetStartedPage from "./GetStartedPage";
import SecDashBoard from "./section_officer_dashboard/sec_o_dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/dashboard" element={<SecDashBoard />} />
        
       

      </Routes>
    </BrowserRouter>
  )
}

export default App;