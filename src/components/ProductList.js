import React, { useState, useEffect } from "react";
import ProductTable from "./ProductTable"; // Componente para mostrar la tabla de productos

/**
 * Componente para listar, editar y eliminar productos.
 */
const ProductList = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos

  /**
   * Hook `useEffect` para cargar los productos al montar el componente.
   */
  useEffect(() => {
    fetch("http://localhost:8080/productos") // URL de la API para obtener productos
      .then((response) => response.json()) // Convierte la respuesta a JSON
      .then((data) => setProducts(data)) // Actualiza el estado con los productos
      .catch((error) => console.error("Error al cargar productos:", error)); // Manejo de errores
  }, []); // [] asegura que solo se ejecute al montar el componente

  /**
   * Maneja la edición de un producto.
   * 
   * @param {number} id - ID del producto a editar
   * @param {Object} updatedProduct - Datos actualizados del producto
   */
  const handleEditProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:8080/productos/${id}`, {
        method: "PUT", // Método HTTP para actualizar
        headers: { "Content-Type": "application/json" }, // Indica que los datos están en formato JSON
        body: JSON.stringify(updatedProduct), // Convierte el producto actualizado a JSON
      });

      if (response.ok) {
        const data = await response.json(); // Convierte la respuesta a JSON
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? data : product // Actualiza el producto en el estado
          )
        );
        alert("Producto actualizado correctamente"); // Mensaje de éxito
      } else {
        throw new Error("No se pudo actualizar el producto");
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error); // Muestra el error en la consola
      alert("Error al actualizar producto"); // Mensaje de error
    }
  };

  /**
   * Maneja la eliminación de un producto.
   * 
   * @param {number} id - ID del producto a eliminar
   */
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/productos/${id}`, {
        method: "DELETE", // Método HTTP para eliminar
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id) // Elimina el producto del estado
        );
        alert("Producto eliminado correctamente"); // Mensaje de éxito
      } else {
        throw new Error("No se pudo eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error); // Muestra el error en la consola
      alert("Error al eliminar producto"); // Mensaje de error
    }
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      {/* Tabla de productos */}
      <ProductTable
        products={products} // Lista de productos
        onEdit={handleEditProduct} // Función para editar producto
        onDelete={handleDeleteProduct} // Función para eliminar producto
      />
    </div>
  );
};

export default ProductList;
