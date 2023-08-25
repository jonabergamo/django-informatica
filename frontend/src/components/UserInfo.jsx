"use client";
import React, { useEffect } from "react";
import { useAuth } from "../Context/Auth";
import { useRouter } from "next/navigation";
import { BiSolidUserCircle, BiArrowToRight } from "react-icons/bi";
import Link from "next/link";
import { motion } from 'framer-motion'

export default function UserInfo() {
  const { isLoggedIn, logout, user } = useAuth();
  const router = useRouter();

  return isLoggedIn ? (
    <div className="flex gap-5 align-middle items-center">
      <div className="flex items-center gap-2">
        <BiSolidUserCircle size={50} />
        <h1 className="font-medium">{user && user.name}</h1>
      </div>
      <motion.div
        className="bg-blue-500 text-white font-bold px-2 flex items-center cursor-pointer rounded-full w-10 h-10"
        onClick={logout}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        title="Sair"
      >
        <BiArrowToRight size={25} />
      </motion.div>
    </div>
  ) : (
    <div className="flex gap-5 align-middle">
      <div className="flex items-center gap-2">
        <BiSolidUserCircle size={50} />
        <h1 className="font-normal w-20 text-sm">
          Faça{" "}
          <span
            onClick={() => {
              router.push("/login");
            }}
            className="cursor-pointer underline font-medium"
          >
            login
          </span>{" "}
          ou crie seu{" "}
          <span
            onClick={() => {
              router.push("/register");
            }}
            className="cursor-pointer underline font-medium"
          >
            cadastro
          </span>
        </h1>
      </div>
    </div>
  );
}
