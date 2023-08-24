"use client";
import React, { useEffect } from "react";
import { useAuth } from "../Context/Auth";

export default function UserInfo() {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{user && user.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{user && user.email}</span>
        </div>
        <button
          className="bg-blue-500 text-white font-bold px-5 py-2 mt-3"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
