"use client";

import NavbarUnauth from "@/components/unauthenticated/NavbarUnauth";
import NavbarAuth from "@/components/authenticated/NavbarAuth";
import NavbarAdmin from "../admin/NavbarAdmin";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import ClearCartManager from "@/components/unauthenticated/ClearCartManager";

export default function Navbar() {
  console.log("Navbar mounted");
  const { isAuthenticated, user } = useLittleLemonStore();

  if (isAuthenticated && user?.role === "ADMIN") {
    return (
      <header className="absolute inset-x-0 top-0 z-50">
        <NavbarAdmin />
      </header>
    );
  }

  if (isAuthenticated) {
    return (
      <header className="absolute inset-x-0 top-0 z-50">
        <NavbarAuth />
      </header>
    );
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <NavbarUnauth />
      <ClearCartManager />
    </header>
  );
}
