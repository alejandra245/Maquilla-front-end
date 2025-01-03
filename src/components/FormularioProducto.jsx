import React, { useState } from 'react';

function FormularioProducto({ onAgregarProducto }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los datos antes de enviarlos
    if (!nombre || !precio || !cantidad) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const producto = {
      nombre,
      precio: parseFloat(precio),
      cantidad: parseInt(cantidad),
    };

    // Llamar a la función pasada como prop
    onAgregarProducto(producto);

    // Limpiar el formulario
    setNombre('');
    setPrecio('');
    setCantidad('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>
      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default FormularioProducto;
