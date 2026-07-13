import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Survivors from "./pages/Survivors";
import Perks from "./pages/Perks";
import Generator from "./pages/Generator";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survivors" element={<Survivors />} />
        <Route path="/perks" element={<Perks />} />
        <Route path="/generator" element={<Generator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;