import React, { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate(); // Usar useNavigate para redireccionar
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    precio: "",
    cantidad: "",
    imagen: "", // Agregar el campo de imagen
  });
  const [editingProduct, setEditingProduct] = useState(null); // Producto en edición

  useEffect(() => {
    fetch("http://localhost:8080/productos")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, data]);
        setNewProduct({ nombre: "", precio: "", cantidad: "", imagen: "" }); // Reiniciar el formulario
        alert("Producto agregado correctamente.");
      })
      .catch((error) => console.error("Error al agregar producto:", error));
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      fetch(`http://localhost:8080/productos/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("No se pudo eliminar el producto.");
          }
          setProducts(products.filter((product) => product.id !== id));
          alert("Producto eliminado exitosamente.");
        })
        .catch((error) => console.error("Error al eliminar producto:", error));
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product); // Establece el producto en edición
  };

  const handleCancelEdit = () => {
    setEditingProduct(null); // Cancela la edición
  };

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

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("user_data");  // Elimina los datos de sesión

    // Redirige al login
    navigate("/login");  // Redirige a la página de inicio de sesión
  };

  return (
    <div className="admin-container">
      <h1>Administrar Productos</h1>


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
