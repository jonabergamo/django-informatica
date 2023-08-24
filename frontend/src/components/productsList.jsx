import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Chamada à API para obter a lista de produtos
    axios
      .get("http://127.0.0.1:8000/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
      });
  }, []); // Passar um array vazio como segundo argumento significa que este efeito será executado apenas uma vez, similar ao componentDidMount

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
