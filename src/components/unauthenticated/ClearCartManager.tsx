"use client";

import { useEffect } from "react";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { useAuth } from "@/libs/hooks/useAuth";

export default function ClearCartManager() {
  const { cart, emptyCart } = useLittleLemonStore();
  const { isAuthenticated } = useAuth();

  // 🔁 Sincronizar cart en sessionStorage (solo si no está autenticado)
  useEffect(() => {
    if (!isAuthenticated) {
      if (cart.length > 0) {
        sessionStorage.setItem("cart", JSON.stringify(cart));
      } else {
        sessionStorage.removeItem("cart");
      }
    }
  }, [cart, isAuthenticated]);

  // 🧹 Limpiar cart al cerrar/reload si no está autenticado
  useEffect(() => {
    if (!isAuthenticated && cart.length > 0) {
      const handleUnload = () => {
        emptyCart();
        sessionStorage.removeItem("cart");
      };

      window.addEventListener("beforeunload", handleUnload);
      return () => {
        window.removeEventListener("beforeunload", handleUnload);
      };
    }
  }, [isAuthenticated, cart.length, emptyCart]);

  return null;
}
