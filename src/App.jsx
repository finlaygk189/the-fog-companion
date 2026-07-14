import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Survivors from "./pages/Survivors";
import Perks from "./pages/Perks";
import Generator from "./pages/Generator";
import "./styles/layout.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/survivors" element={<Survivors />} />
            <Route path="/perks" element={<Perks />} />
            <Route path="/generator" element={<Generator />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;