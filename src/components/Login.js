import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para redirigir entre rutas
import "./Login.css"; // Archivo de estilos para el componente

/**
 * Componente de inicio de sesión.
 * Permite a los usuarios ingresar sus credenciales y redirige según su rol.
 */
const Login = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({ username: "", password: "" });

  const navigate = useNavigate(); // Hook para manejar la navegación

  /**
   * Maneja los cambios en los campos del formulario.
   * Actualiza el estado `formData` con los valores ingresados.
   */
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del campo
    setFormData({ ...formData, [name]: value }); // Actualiza el estado correspondiente
  };

  /**
   * Maneja el envío del formulario.
   * Realiza una solicitud al backend para autenticar al usuario.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Configuración para JSON
      body: JSON.stringify(formData), // Convierte los datos del formulario a JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Credenciales incorrectas"); // Maneja errores de autenticación
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then((data) => {
        alert(`Inicio de sesión exitoso: Rol: ${data.role}`); // Muestra el rol del usuario
        console.log(data);

        // Redirige según el rol del usuario
        if (data.role === "TRABAJADOR") {
          navigate("/admin"); // Página para trabajadores
        } else if (data.role === "COMPRADOR") {
          navigate("/buyer"); // Página para compradores
        } else {
          alert("Rol desconocido. Contacta al administrador.");
        }
      })
      .catch((error) => alert(`Error al iniciar sesión: ${error.message}`)); // Maneja errores
  };

  return (
    // Contenedor principal del formulario de inicio de sesión
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Fem Beauty</h1> {/* Título principal */}
        <h2 className="login-subtitle">Inicio de Sesión</h2> {/* Subtítulo */}
        <form onSubmit={handleSubmit}>
          {/* Campo para el nombre de usuario */}
          <div className="input-container">
            <i className="icon fa fa-user"></i> {/* Ícono de usuario */}
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={formData.username} // Valor del campo
              onChange={handleChange} // Maneja cambios en el campo
              required // Campo obligatorio
            />
          </div>
          {/* Campo para la contraseña */}
          <div className="input-container">
            <i className="icon fa fa-lock"></i> {/* Ícono de candado */}
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password} // Valor del campo
              onChange={handleChange} // Maneja cambios en el campo
              required // Campo obligatorio
            />
          </div>
          {/* Botón para enviar el formulario */}
          <button className="login-button" type="submit">
            Iniciar Sesión
          </button>
        </form>
        {/* Enlace para registrarse */}
        <p className="register-link">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
