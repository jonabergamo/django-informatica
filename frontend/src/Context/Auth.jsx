"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Você pode verificar o token no localStorage aqui
  const [user, setUser] = useState();
  const [message, setMessage] = useState();
  const [cart, setCart] = useState();
  const [showCart, setShowCart] = useState(false)

  const getUser = (user_id) => {
    axios
      .get(`http://127.0.0.1:8000/users/${user_id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
        logout()
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    if (token) {
      setIsLoggedIn(true);
      getUser(user_id);
    }
  }, []);

  const new_message = (message) => {
    setMessage(message);
    setInterval(() => {
      setMessage();
    }, 8000);
  };

  const login = (token, user_id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", user_id);
    setIsLoggedIn(true);
    getUser(user_id);
    router.push("/");

  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
  };

  const getCart = async () => {
    const response = await axios
      .get(`http://127.0.0.1:8000/cart/${localStorage.getItem("user_id")}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setCart(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
      });
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user, new_message, message, getCart, cart, setCart, setShowCart, showCart }}
    >
      {children}
    </AuthContext.Provider>
  );
}
