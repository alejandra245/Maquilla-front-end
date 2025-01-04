import React, { useState } from "react";
import "./Login.css"; // Usamos el archivo CSS existente para mantener la coherencia visual

/**
 * Componente de registro de usuario.
 * Permite crear una nueva cuenta con un rol específico.
 */
const Register = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    username: "", // Nombre de usuario
    password: "", // Contraseña
    role: "COMPRADOR", // Rol predeterminado (Comprador)
  });

  /**
   * Maneja los cambios en los campos del formulario.
   * Actualiza el estado con los valores ingresados.
   */
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del campo
    setFormData({ ...formData, [name]: value }); // Actualiza el estado correspondiente
  };

  /**
   * Maneja el envío del formulario.
   * Envía los datos al backend para registrar un nuevo usuario.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    fetch("http://localhost:8080/auth/register", {
      method: "POST", // Método HTTP para crear un nuevo recurso
      headers: { "Content-Type": "application/json" }, // Indica que los datos están en formato JSON
      body: JSON.stringify(formData), // Convierte los datos del formulario a JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al registrar el usuario"); // Manejo de errores en la respuesta
        }
        return response.json(); // Convierte la respuesta a JSON si es exitosa
      })
      .then(() => {
        alert("Usuario registrado exitosamente"); // Mensaje de éxito
        window.location.href = "/login"; // Redirige a la página de inicio de sesión
      })
      .catch((error) => alert(`Error al registrar: ${error.message}`)); // Manejo de errores
  };

  return (
    // Contenedor principal del formulario de registro
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Regístrate</h1> {/* Título de la página */}
        <form onSubmit={handleSubmit}>
          {/* Campo para el nombre de usuario */}
          <div className="input-container">
            <i className="icon fa fa-user"></i> {/* Ícono de usuario */}
            <input
              type="text" // Tipo de campo de texto
              name="username" // Nombre del campo (coincide con el estado)
              placeholder="Nombre de usuario"
              value={formData.username} // Valor actual del campo
              onChange={handleChange} // Maneja los cambios
              required // Campo obligatorio
            />
          </div>
          {/* Campo para la contraseña */}
          <div className="input-container">
            <i className="icon fa fa-lock"></i> {/* Ícono de candado */}
            <input
              type="password" // Tipo de campo de contraseña
              name="password" // Nombre del campo (coincide con el estado)
              placeholder="Contraseña"
              value={formData.password} // Valor actual del campo
              onChange={handleChange} // Maneja los cambios
              required // Campo obligatorio
            />
          </div>
          {/* Campo para seleccionar el rol */}
          <div className="input-container">
            <i className="icon fa fa-user-tag"></i> {/* Ícono de rol */}
            <select
              name="role" // Nombre del campo (coincide con el estado)
              value={formData.role} // Valor actual del campo
              onChange={handleChange} // Maneja los cambios
            >
              <option value="COMPRADOR">Comprador</option> {/* Rol Comprador */}
              <option value="TRABAJADOR">Trabajador</option> {/* Rol Trabajador */}
            </select>
          </div>
          {/* Botón para enviar el formulario */}
          <button className="login-button" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
