"use client";
import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import { useAuth } from "../Context/Auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartButton from "./CartButton";
import CategoryBar from './CategoryBar'

export default function NavigationBar() {
  const { isLoggedIn, user } = useAuth();
  const [search, setSearch] = useState();
  const router = useRouter();

  useEffect(() => {
    setSearch();
  }, []);

  const changePage = () => {
    router.replace(`/search/${search}/`);
    setSearch("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    changePage();
  };

  return (
    <header >
      <div className="pt-2 flex items-center justify-around align-middle">
        <h1
          className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-4xl font-bold cursor-pointer select-none"
          onClick={() => {
            router.push("/");
          }}
        >
          J-commerce
        </h1>
        <form className="w-96" onSubmit={handleSearch}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Procure por produtos..."
              required
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Procurar
            </button>
          </div>
        </form>
        <UserInfo user={user} />
        <CartButton />
      </div>
      <CategoryBar />
    </header>
  );
}
