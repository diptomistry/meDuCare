import Home from "./home";
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import GetStartedPage from "./GetStartedPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/get-started" element={<GetStartedPage />} />
       

      </Routes>
    </BrowserRouter>
  )
}

export default App;