"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useLittleLemonStore } from "@/store/little-lemon-store";

const ShoppingCart = () => {
  const cart = useLittleLemonStore((state) => state.cart);

  console.log("ShoppingCart component rendered", cart);

  const totalItems = Array.isArray(cart)
    ? cart.map((item) => item.quantity).reduce((acc, qty) => acc + qty, 0)
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
