"use client";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../Context/Auth";
import Link from "next/link";
import UserInfo from "../components/UserInfo";
import AlertMessage from "../components/AlertMessage";
import ProductList from "../components/ProductList";
import NavigationBar from "../components/NavigationBar";

export default function Home() {
  const { isLoggedIn, logout, user, message } = useAuth();

  return (
    <main>
      <div className="px-32">
        <ProductList />
      </div>
    </main>
  );
}
