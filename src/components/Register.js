import React, { useState } from "react";
import "./Login.css"; // Usamos el mismo archivo CSS para mantener la coherencia

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "", role: "COMPRADOR" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al registrar el usuario");
        }
        return response.json();
      })
      .then(() => {
        alert("Usuario registrado exitosamente");
        window.location.href = "/login";
      })
      .catch((error) => alert(`Error al registrar: ${error.message}`));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Regístrate</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="icon fa fa-user"></i>
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
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
          <div className="input-container">
            <i className="icon fa fa-user-tag"></i>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="COMPRADOR">Comprador</option>
              <option value="TRABAJADOR">Trabajador</option>
            </select>
          </div>
          <button className="login-button" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
