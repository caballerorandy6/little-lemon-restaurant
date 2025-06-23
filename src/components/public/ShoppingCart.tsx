"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { getCartFromDB } from "@/libs/utils";
import { useAuth } from "@/libs/hooks/useAuth";
import { useEffect } from "react";
import { useLittleLemonStore } from "@/store/little-lemon-store";

const ShoppingCart = () => {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const { cart, setCart } = useLittleLemonStore();

  useEffect(() => {
    const fetchCart = async () => {
      console.log("Fetching cart - isAuthenticated:", isAuthenticated);
      if (isAuthenticated) {
        try {
          const cartData = await getCartFromDB();
          setCart(cartData);
        } catch (err) {
          console.error("Cart fetch failed:", err);
        }
      }
    };
    fetchCart();
  }, [isAuthenticated, setCart]);

  console.log("Cart:", cart);

  const totalItems = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return (
    <div className="ml-4 flow-root lg:ml-8">
      <Link href="/cart" className="group -m-2 flex items-center p-2">
        <ShoppingCartIcon className="size-6 shrink-0 hover:text-green-600 transition-colors" />
        <span className="ml-2 text-sm font-medium">
          {isLoadingAuth ? (
            <div className="h-4 w-4 rounded bg-gray-100 animate-pulse" />
          ) : isAuthenticated ? (
            totalItems
          ) : (
            0
          )}
        </span>
      </Link>
    </div>
  );
};

export default ShoppingCart;
