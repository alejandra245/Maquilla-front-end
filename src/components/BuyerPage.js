import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./BuyerPage.css";

const BuyerPage = () => {
    const navigate = useNavigate(); // Usar useNavigate para redireccionar
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Si hay un término de búsqueda, realiza la consulta al backend
    if (searchTerm) {
      fetch("http://localhost:8080/productos/buscar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchTerm }), // Envía el término de búsqueda
      })
        .then((response) => response.json())
        .then((data) => setProducts(data))  // Actualiza los productos con la respuesta
        .catch((error) => console.error("Error al cargar productos:", error));
    } else {
      // Si no hay término de búsqueda, carga todos los productos
      fetch("http://localhost:8080/productos")
        .then((response) => response.json())
        .then((data) => setProducts(data))  // Actualiza los productos
        .catch((error) => console.error("Error al cargar productos:", error));
    }
  }, [searchTerm]); // Este hook se ejecuta cada vez que searchTerm cambia


  const handleBuy = (product) => {
    if (product.cantidad > 0) {
      fetch(`http://localhost:8080/productos/comprar/${product.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            alert(`Compra exitosa de ${product.nombre}.`);
            // Actualizar el stock en el frontend
            setProducts((prevProducts) =>
              prevProducts.map((p) =>
                p.id === product.id ? { ...p, cantidad: p.cantidad - 1 } : p
              )
            );
          } else {
            alert("No se pudo realizar la compra. Inténtalo nuevamente.");
          }
        })
        .catch((error) => console.error("Error al realizar la compra:", error));
    } else {
      alert("Producto no disponible.");
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("user_data");  // Elimina los datos de sesión

    // Redirige al login
    navigate("/login");  // Redirige a la página de inicio de sesión
  };

  return (
    <div className="buyer-container">
      <h1 className="buyer-title">Lista de Productos</h1>

       {/* Campo de búsqueda */}
    <input
      type="text"
      placeholder="Buscar producto..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} // Actualiza searchTerm
      className="search-input" // Puedes agregar una clase para estilo
    />
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imagen} alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <p>${product.precio}</p>
            <p>Stock: {product.cantidad}</p>
            <button
              onClick={() => handleBuy(product)}
              disabled={product.cantidad <= 0}
            >
              {product.cantidad > 0 ? "Comprar" : "No disponible"}
            </button>
          </div>
          
        ))}
      </div>
      <button onClick={handleLogout}>Cerrar sesión</button> 
    </div>
  );
};

export default BuyerPage;

