import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HealthAdvisor from "./pages/HealthAdvisor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/healthadvisor" element={<HealthAdvisor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
