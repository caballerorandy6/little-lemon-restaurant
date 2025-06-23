"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useLittleLemonStore } from "@/store/little-lemon-store";

const ShoppingCart = () => {
  const { cart } = useLittleLemonStore();

  console.log("ShoppingCart component rendered with cart:", cart);
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="ml-4 flow-root lg:ml-8">
      <Link href="/cart" className="group -m-2 flex items-center p-2">
        <ShoppingCartIcon className="size-6 shrink-0 hover:text-green-600 transition-colors" />
        <span className="ml-2 text-sm font-medium">{count}</span>
      </Link>
    </div>
  );
};

export default ShoppingCart;
