import React, { useState } from 'react';

/**
 * Componente de formulario para agregar un producto.
 * 
 * Este componente recibe una función `onAgregarProducto` como prop, 
 * que se utiliza para enviar los datos del producto al componente padre.
 */
function FormularioProducto({ onAgregarProducto }) {
  // Estados para almacenar los valores del formulario
  const [nombre, setNombre] = useState(''); // Estado para el nombre del producto
  const [precio, setPrecio] = useState(''); // Estado para el precio del producto
  const [cantidad, setCantidad] = useState(''); // Estado para la cantidad del producto

  /**
   * Maneja el envío del formulario.
   * Valida los datos y los envía a través de la función `onAgregarProducto`.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página

    // Validar que todos los campos estén llenos
    if (!nombre || !precio || !cantidad) {
      alert('Todos los campos son obligatorios'); // Mostrar alerta si falta algún campo
      return;
    }

    // Crear el objeto producto con los datos del formulario
    const producto = {
      nombre, // Nombre del producto
      precio: parseFloat(precio), // Convertir el precio a un número flotante
      cantidad: parseInt(cantidad), // Convertir la cantidad a un número entero
    };

    // Llamar a la función `onAgregarProducto` pasada como prop
    onAgregarProducto(producto);

    // Limpiar los campos del formulario después de enviar
    setNombre(''); // Reiniciar el nombre
    setPrecio(''); // Reiniciar el precio
    setCantidad(''); // Reiniciar la cantidad
  };

  return (
    // Formulario para capturar los datos del producto
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text" // Campo de texto
          value={nombre} // Vincular el estado `nombre` con el campo
          onChange={(e) => setNombre(e.target.value)} // Actualizar el estado al cambiar
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number" // Campo numérico
          value={precio} // Vincular el estado `precio` con el campo
          onChange={(e) => setPrecio(e.target.value)} // Actualizar el estado al cambiar
        />
      </div>
      <div>
        <label>Cantidad:</label>
        <input
          type="number" // Campo numérico
          value={cantidad} // Vincular el estado `cantidad` con el campo
          onChange={(e) => setCantidad(e.target.value)} // Actualizar el estado al cambiar
        />
      </div>
      <button type="submit">Agregar Producto</button> {/* Botón para enviar el formulario */}
    </form>
  );
}

export default FormularioProducto;
