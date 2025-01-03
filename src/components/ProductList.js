import React, { useState, useEffect } from "react";
import ProductTable from "./ProductTable";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/productos")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  const handleEditProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:8080/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const data = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? data : product
          )
        );
        alert("Producto actualizado correctamente"); // Mensaje al guardar
      } else {
        throw new Error("No se pudo actualizar el producto");
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      alert("Error al actualizar producto");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/productos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        alert("Producto eliminado correctamente");
      } else {
        throw new Error("No se pudo eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Error al eliminar producto");
    }
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ProductTable
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductList;
