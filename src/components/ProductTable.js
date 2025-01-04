import React from "react";

/**
 * Componente para renderizar una tabla de productos.
 * Incluye funcionalidades para editar y eliminar productos si el usuario tiene privilegios de administrador.
 */
const ProductTable = ({
  products, // Lista de productos
  onDelete, // Función para manejar la eliminación de productos
  onEdit, // Función para activar el modo de edición
  onSaveEdit, // Función para guardar cambios en un producto
  onCancelEdit, // Función para cancelar la edición
  editingProduct, // Producto que actualmente está en modo de edición
  setEditingProduct, // Función para actualizar el producto en edición
  isAdmin, // Indica si el usuario es administrador
}) => {
  /**
   * Maneja los cambios en los campos de edición.
   * Actualiza los valores del producto en edición.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del campo
    setEditingProduct({ ...editingProduct, [name]: value }); // Actualiza el producto en edición
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {/* Mapea y renderiza cada producto en una fila */}
        {products.map((product) => (
          <tr key={product.id}>
            {/* Si el producto está en modo de edición */}
            {editingProduct && editingProduct.id === product.id ? (
              <>
                <td>
                  <input
                    type="text"
                    name="nombre"
                    value={editingProduct.nombre}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="precio"
                    value={editingProduct.precio}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="cantidad"
                    value={editingProduct.cantidad}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="imagen"
                    placeholder="URL de la imagen"
                    value={editingProduct.imagen || ""}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <button onClick={onSaveEdit}>Guardar</button>
                  <button onClick={onCancelEdit}>Cancelar</button>
                </td>
              </>
            ) : (
              <>
                {/* Si el producto no está en modo de edición */}
                <td>{product.nombre}</td>
                <td>${product.precio}</td>
                <td>{product.cantidad}</td>
                <td>
                  {product.imagen ? (
                    <img
                      src={product.imagen} // Muestra la imagen del producto
                      alt={product.nombre}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover", // Mantiene las proporciones
                      }}
                    />
                  ) : (
                    "No disponible"
                  )}
                </td>
                <td>
                  {/* Acciones disponibles solo para administradores */}
                  {isAdmin && (
                    <>
                      <button onClick={() => onEdit(product)}>Editar</button>
                      <button onClick={() => onDelete(product.id)}>
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
