"use client";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../Context/Auth";
import Link from "next/link";
import UserInfo from "../components/UserInfo";
import AlertMessage from "../components/AlertMessage";

export default function Home() {
  const { isLoggedIn, logout, user, message } = useAuth();

  


  return (
    <main>
      {message && <AlertMessage>{message}</AlertMessage>}
      <h1>Home</h1>
      {isLoggedIn ? (
        <div>
          <UserInfo user={user} />
        </div>
      ) : (
        <Link href="/login">
          <h1>
            Você não está logado{" "}
            <span className="underline">Clique para Logar</span>
          </h1>
        </Link>
      )}
    </main>
  );
}
