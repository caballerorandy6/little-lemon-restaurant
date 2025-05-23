"use client";

import NavbarUnauth from "@/components/unauthenticated/NavbarUnauth";
import NavbarAuth from "@/components/authenticated/NavbarAuth";
import NavbarAdmin from "../admin/NavbarAdmin";
import { useAuth } from "@/libs/hooks/useAuth";
import { useLittleLemonStore } from "@/store/little-lemon-store";

export default function Navbar() {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const { user } = useLittleLemonStore();

  if (isLoadingAuth) {
    return <div className="h-16" />;
  }

  // 1) Admin logueado
  if (isAuthenticated && user?.role === "ADMIN") {
    return (
      <header className="absolute inset-x-0 top-0 z-50">
        <NavbarAdmin />
      </header>
    );
  }

  // 2) Usuario normal logueado
  if (isAuthenticated) {
    return (
      <header className="absolute inset-x-0 top-0 z-50">
        <NavbarAuth />
      </header>
    );
  }

  // 3) No autenticado
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <NavbarUnauth />
    </header>
  );
}
