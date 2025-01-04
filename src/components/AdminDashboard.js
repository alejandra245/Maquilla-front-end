import React, { useState, useEffect } from "react";
import ProductTable from "./ProductTable"; // Componente para mostrar la tabla de productos
import { useNavigate } from "react-router-dom"; // Navegación entre rutas
import "./AdminDashboard.css"; // Estilos específicos para este componente

/**
 * Componente principal para la gestión de productos en el panel de administración.
 */
const AdminDashboard = () => {
  const navigate = useNavigate(); // Hook para redirigir entre páginas
  const [products, setProducts] = useState([]); // Estado para los productos
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    precio: "",
    cantidad: "",
    imagen: "", // Campo adicional para la URL de la imagen
  }); // Estado para el nuevo producto
  const [editingProduct, setEditingProduct] = useState(null); // Estado para el producto en edición

  // Cargar productos desde el backend al montar el componente
  useEffect(() => {
    fetch("http://localhost:8080/productos")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  /**
   * Maneja el envío del formulario para agregar un nuevo producto.
   */
  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, data]); // Actualiza la lista de productos
        setNewProduct({ nombre: "", precio: "", cantidad: "", imagen: "" }); // Reinicia el formulario
        alert("Producto agregado correctamente.");
      })
      .catch((error) => console.error("Error al agregar producto:", error));
  };

  /**
   * Maneja la eliminación de un producto.
   * @param {number} id - ID del producto a eliminar
   */
  const handleDeleteProduct = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      fetch(`http://localhost:8080/productos/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("No se pudo eliminar el producto.");
          }
          setProducts(products.filter((product) => product.id !== id)); // Elimina el producto de la lista
          alert("Producto eliminado exitosamente.");
        })
        .catch((error) => console.error("Error al eliminar producto:", error));
    }
  };

  /**
   * Activa el modo de edición para un producto.
   * @param {Object} product - Producto a editar
   */
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  /**
   * Cancela el modo de edición.
   */
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  /**
   * Guarda los cambios realizados a un producto en edición.
   */
  const handleSaveEdit = () => {
    fetch(`http://localhost:8080/productos/${editingProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingProduct),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        setProducts(
          products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setEditingProduct(null); // Salir del modo de edición
        alert("Producto actualizado correctamente.");
      })
      .catch((error) => console.error("Error al editar producto:", error));
  };

  /**
   * Cierra la sesión del usuario y redirige al inicio de sesión.
   */
  const handleLogout = () => {
    localStorage.removeItem("user_data"); // Elimina los datos de sesión del almacenamiento local
    navigate("/login"); // Redirige al login
  };

  return (
    <div className="admin-container">
      <h1>Administrar Productos</h1>

      {/* Formulario para agregar productos */}
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={newProduct.nombre}
          onChange={(e) =>
            setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={newProduct.precio}
          onChange={(e) =>
            setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={newProduct.cantidad}
          onChange={(e) =>
            setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={newProduct.imagen}
          onChange={(e) =>
            setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
          }
          required
        />
        <button type="submit">Agregar Producto</button>
      </form>

      {/* Componente para mostrar y gestionar la tabla de productos */}
      <ProductTable
        products={products}
        onDelete={handleDeleteProduct}
        onEdit={handleEditClick}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        isAdmin={true}
      />

      {/* Botón de cerrar sesión */}
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default AdminDashboard;
