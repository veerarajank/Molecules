import { BrowserRouter, Routes, Route } from "react-router-dom";
import Activities from "./pages/Activities";
import Molecules from "./pages/Molecules";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/activities" element={<Activities />} />
        <Route exact path="/" element={<Molecules />} />
      </Routes>
    </BrowserRouter>
  );
}
