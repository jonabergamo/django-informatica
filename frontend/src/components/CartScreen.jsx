import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/Auth";
import { BiTrash } from 'react-icons/bi'
import { motion, useDragControls } from 'framer-motion'

export default function CartScreen() {
  const { user, token, getCart, cart } = useAuth();




  useEffect(() => {
    getCart()
  }, []);

  return (

    cart && (
      <motion.div className="absolute right-2 top-[6rem] max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-2 p-4" initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}>
        <h1 className="text-xl font-medium">Meu carrinho:</h1>
        <div className="flex flex-col gap-3 m-h-96 overflow-y-scroll overflow-x-hidden">
          {cart.items &&
            cart.items.map((item, index) => (
              <div key={index}>
                <CartItem item={item.product} />
              </div>
            ))
          }
        </div>
        {cart.items.length > 0 ?
          <div>
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
          </div> : <h1>Nada por aqui, adicione itens para começar!</h1>}
      </motion.div>
    )

  );
}

const CartItem = ({ item }) => {
  const { cart, getCart, new_message } = useAuth();
  const [removing, setRemoving] = useState(false)

  const handleRemove = async (event, info) => {
    const passed = info.point.x < 1000

    if (passed) {
      const response = await axios.post(`http://127.0.0.1:8000/cart/${localStorage.getItem("user_id")}/remove_product/`, {
        product_id: item.id,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Se a autenticação for necessária
      })
        .then((response) => {
          getCart()
          setRemoving(false)
          new_message('Item removido com sucesso do carrinho!')
          return response.data;
        })
        .catch((error) => {
          console.error("Erro ao remover produto", error);
        });
    }
  }

  return (
    <motion.div className="flex bg-white p-5 max-w-sm  border border-gray-200 rounded-lg shadow" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }} drag='x' dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleRemove} whileDrag={{ filter: 'contrast(0.6)' }}>
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

    </motion.div>
  );
};
