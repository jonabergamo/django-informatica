"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../Context/Auth";

export default function RegisterForm() {
  const { login, new_message } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/users/register/",
        {
          email,
          name,
          password,
        }
      );
      setError();
      const token = response.data.access;
      const user_id = response.data.user_id;
      new_message("Conta criada com sucesso! Faça login para continuar");
      router.push("/login");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="grid place-items-center h-full">
      <div className=" p-8 rounded-lg border-t-4 border-blue-400 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
          <label htmlFor="" className="h-3">Nome Completo</label>
          <input
            type="text"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="bg-white rounded-sm text-zinc-900"
          />
          <label htmlFor="" className="h-3">E-mail</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-white rounded-sm text-zinc-900"
          />
          <label htmlFor="" className="h-3">Senha</label>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-white rounded-sm text-zinc-900"
          />
          <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
            Enter
          </button>
          {error && (
            <div className="bg-blue-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <Link href="/login" className="text-sm mt-3 text-right">
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
