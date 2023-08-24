"use client";
import React, { useState } from "react";
import UserInfo from "./UserInfo";
import { useAuth } from "../Context/Auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
  const { isLoggedIn, user } = useAuth();
  const [search, setSearch] = useState();
  const router = useRouter();

  const handleSearch = () => {
    router.replace(`search/${search}/`);
  };

  return (
    <header className="py-5 flex items-center justify-around">
      <h1
        className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-4xl font-bold cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        J-commerce
      </h1>
      <form className="w-[500px]" onSubmit={handleSearch}>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Procure por produtos..."
            required
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Procurar
          </button>
        </div>
      </form>
      <UserInfo user={user} />
    </header>
  );
}