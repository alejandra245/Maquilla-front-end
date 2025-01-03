import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redirigir
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate(); // Hook para redirigir

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Credenciales incorrectas");
        }
        return response.json();
      })
      .then((data) => {
        alert(`Inicio de sesión exitoso: Rol: ${data.role}`);
        console.log(data);

        // Redirige según el rol
        if (data.role === "TRABAJADOR") {
          navigate("/admin"); // Página para trabajadores
        } else if (data.role === "COMPRADOR") {
          navigate("/buyer"); // Página para compradores
        } else {
          alert("Rol desconocido. Contacta al administrador.");
        }
      })
      .catch((error) => alert(`Error al iniciar sesión: ${error.message}`));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Fem Beauty</h1>
        <h2 className="login-subtitle">Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="icon fa fa-user"></i>
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <i className="icon fa fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="login-button" type="submit">
            Iniciar Sesión
          </button>
        </form>
        <p className="register-link">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
