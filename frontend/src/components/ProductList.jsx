"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RatingStars from "./RatingStarts";
import { useAuth } from "../Context/Auth";
import { useRouter } from 'next/navigation'

export default function ProductList(props) {

  const search_therm = props.search ? "search/" + props.search + "/" : "";
  const { user, getCart, setShowCart, getProducts, products } = useAuth()
  const router = useRouter()


  useEffect(() => {
    // Chamada à API para obter a lista de produtos
    getProducts(search_therm)
  }, []); // Passar um array vazio como segundo argumento significa que este efeito será executado apenas uma vez, similar ao componentDidMount

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  const handleAddCart = async (productId, quantity) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/cart/${user.id}/add_product/`, {
        product_id: productId,
        quantity: quantity,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Se a autenticação for necessária
      });

      console.log('Produto adicionado com sucesso:', response.data);
      getCart()
      setShowCart(true)
    } catch (error) {
      console.error('Erro ao adicionar o produto:', error);
    }
  }

  return (
    <div className="flex gap-5 flex-wrap pb-16">
      {products.length > 0 ? products.map((product) => (
        <div
          key={product.id}
          className="p-7 flex flex-col w-64 bg-white rounded-lg justify-between items-center shadow-[rgba(0,_0,_0,_0.9)_0px_30px_40px]"
        >
          <RatingStars rating={product.rating} />
          <img src={product.image} alt="" className="w-52 mb-2" />
          <h1 className="text-gray-500 font-medium h-20" title={product.name}>
            {truncateString(product.name, 65)}
          </h1>
          {product.promotional_price ? (
            <div className="flex flex-col items-center  justify-center">
              <p className="text-gray-500 font-medium text-[15px] mt-2 line-through">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </p>
              <p className="text-blue-500 font-bold text-xl">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.promotional_price)}
              </p>
            </div>
          ) : (
            <p className="text-blue-500 font-bold text-xl mt-5">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </p>
          )}

          <h1 className="text-gray-500 font-medium">
            {product.quantity} unidades restantes
          </h1>
          <button
            type="button"
            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 mt-5"
            onClick={() => {
              handleAddCart(product.id, 1)
            }}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      )) : <div className="flex flex-col w-full h-full mt-[15%] justify-center items-center"><h1 className="text-xl text-gray-300">Nenhum produto encontrado :(</h1>          <button
        type="button"
        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 mt-5"
        onClick={() => {
          router.replace('/')
        }}
      >
        Voltar à pagina inicial
      </button></div>}
    </div>
  );
}
