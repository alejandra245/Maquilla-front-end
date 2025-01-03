import React from "react";

const ProductTable = ({
  products,
  onDelete,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  editingProduct,
  setEditingProduct,
  isAdmin,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
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
        {products.map((product) => (
          <tr key={product.id}>
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
                <td>{product.nombre}</td>
                <td>${product.precio}</td>
                <td>{product.cantidad}</td>
                <td>
                  {product.imagen ? (
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  ) : (
                    "No disponible"
                  )}
                </td>
                <td>
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
