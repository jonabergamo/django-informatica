"use client";
import React from "react";
import ProductList from "../../../components/ProductList";

export default function page({ params }) {
  const userSearch = params.userSearch;
  return (
    <div>
      <div className="px-32">
        <h1 className="py-3">
          Você pesquisou por: <span className="font-medium">{userSearch}</span>
        </h1>
        <ProductList search={userSearch} />
      </div>
    </div>
  );
}
