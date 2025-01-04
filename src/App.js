import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import BuyerPage from "./components/BuyerPage";

/**
 * Componente principal de la aplicación.
 * 
 * Configura las rutas de navegación utilizando `react-router-dom`.
 */
function App() {
  return (
    // `Router` es el componente principal para manejar las rutas en la aplicación.
    <Router>
      {/* `Routes` contiene todas las rutas disponibles en la aplicación */}
      <Routes>
        {/* Redirige la ruta raíz ("/") a la página de inicio de sesión */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ruta para la página de inicio de sesión */}
        <Route path="/login" element={<Login />} />

        {/* Ruta para el panel de administración */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Ruta para la página principal (Home) */}
        <Route path="/home" element={<HomePage />} />

        {/* Ruta para la página de registro */}
        <Route path="/register" element={<Register />} />

        {/* Ruta para la página del comprador */}
        <Route path="/buyer" element={<BuyerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
