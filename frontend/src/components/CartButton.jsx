import React, { useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import CartScreen from "./CartScreen";
import { useAuth } from "../Context/Auth";

export default function CartButton() {
  const [show, setShow] = useState(false);
  const { cart, getCart } = useAuth();

  useEffect(() => {
    getCart()
  }, [])

  return (
    <div
      title="Carrinho">
      {cart && cart.items.length > 0 && <div className="relative bg-blue-500 h-5 w-5  rounded-full flex align-middle justify-center items-center p-1 select-none"><h1 className="text-white">{cart.items.length}</h1></div>}
      <BiCart
        size={30}
        className="hover:text-blue-500 cursor-pointer select-none"
        onClick={() => {
          setShow(!show);
        }}
      />
      {show && <CartScreen />}
    </div>
  );
}
