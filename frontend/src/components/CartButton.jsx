import React, { useState } from "react";
import { BiCart } from "react-icons/bi";
import CartScreen from "./CartScreen";

export default function CartButton() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <BiCart
        size={30}
        className="hover:text-blue-500 cursor-pointer"
        onClick={() => {
          setShow(!show);
        }}
      />
      {show && <CartScreen />}
    </div>
  );
}
