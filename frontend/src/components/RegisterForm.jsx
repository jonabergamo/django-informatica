"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

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
      return response.data;
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="bg-white rounded-sm text-zinc-900"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-white rounded-sm text-zinc-900"
          />
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
          <Link href="/" className="text-sm mt-3 text-right">
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
