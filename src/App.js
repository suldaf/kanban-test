import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/v1" replace={true} />} />
      <Route path="/v1" element={<Home />} />
    </Routes>
  );
}

export default App;
