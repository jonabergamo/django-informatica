import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/Auth";

export default function CartScreen() {
  const { user, token } = useAuth();
  const [cart, setCart] = useState();

  useEffect(() => {
    // Chamada à API para obter a lista de produtos
    axios
      .get(`http://127.0.0.1:8000/cart/${localStorage.getItem("user_id")}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
      });
  }, []);

  return (
    cart && (
      <div className="absolute right-2 top-[6rem] max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-2 p-4">
        <h1 className="text-xl font-medium">Meu carrinho:</h1>
        {cart &&
          cart.items.map((item, index) => (
            <div>
              <CartItem item={item.product} />
            </div>
          ))}
        <h1 className="text-xl py-5">
          Valor Total:{" "}
          <span className="font-bold text-2xl text-blue-500">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(cart.total_price)}
          </span>
        </h1>
        <button className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Finalizar compra
        </button>
      </div>
    )
  );
}

const CartItem = ({ item }) => {
  return (
    <div className="flex p-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <img src={item.image} alt="" className="w-auto h-16 p-1" />
      <h1 className="text-zinc-900">{item.name}</h1>
      <h2 className="text-lg text-blue-500 font-bold">
        {item.promotional_price
          ? new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.promotional_price)
          : new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.price)}
      </h2>
    </div>
  );
};
