"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import login from "../api/Login";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/login/", {
        email: email,
        password: password,
      });

      // Aqui você pode salvar o token JWT no local storage ou em cookies, por exemplo
      localStorage.setItem("token", response.data.access);

      return response.data; // Retorna os dados de resposta (token, user_id, etc.)
    } catch (error) {
      // Trate o erro conforme necessário
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="bg-white rounded-sm text-zinc-900"
          />
          <input
            className="bg-white rounded-sm text-zinc-900"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
            Enter
          </button>
          {error && (
            <div className="bg-blue-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <Link href="/register" className="text-sm mt-3 text-right">
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
