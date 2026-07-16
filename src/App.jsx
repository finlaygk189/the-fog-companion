import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Survivors from "./pages/Survivors";
import SurvivorDetails from "./pages/SurvivorDetails";
import Perks from "./pages/Perks";
import PerkDetails from "./pages/PerkDetails";
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

            <Route
              path="/survivors"
              element={<Survivors />}
            />

            <Route
              path="/survivors/:survivorId"
              element={<SurvivorDetails />}
            />

            <Route path="/perks" element={<Perks />} />

            <Route
              path="/perks/:perkId"
              element={<PerkDetails />}
            />

            <Route
              path="/generator"
              element={<Generator />}
            />

            <Route path="/test" element={<h1>Test route works</h1>} />
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;