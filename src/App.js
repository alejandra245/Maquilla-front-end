import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import BuyerPage from "./components/BuyerPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la ruta raíz ("/") a la página de inicio de sesión */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buyer" element={<BuyerPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
