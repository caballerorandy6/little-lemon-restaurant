"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { getCartFromDB } from "@/libs/utils";

const ShoppingCart = () => {
  const cart = useLittleLemonStore((state) => state.cart);
  const setCart = useLittleLemonStore((state) => state.setCart);
  const isAuthenticated = useLittleLemonStore((state) => state.isAuthenticated);

  // Cargar el carrito desde la base de datos si está autenticado y el cart local está vacío
  useEffect(() => {
    const fetchCartIfNeeded = async () => {
      if (isAuthenticated && cart.length === 0) {
        const fetchedCart = await getCartFromDB();

        if (Array.isArray(fetchedCart)) {
          setCart(fetchedCart);
        }
      }
    };

    fetchCartIfNeeded();
  }, [isAuthenticated, cart.length, setCart]);

  const totalItems = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return (
    <div className="ml-4 flow-root lg:ml-8">
      <Link href="/cart" className="group -m-2 flex items-center p-2">
        <ShoppingCartIcon className="size-6 shrink-0 hover:text-green-600 transition-colors" />
        <span className="ml-2 text-sm font-medium">{totalItems}</span>
      </Link>
    </div>
  );
};

export default ShoppingCart;
