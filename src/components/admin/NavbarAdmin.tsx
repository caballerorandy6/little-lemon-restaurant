"use client";

import Link from "next/link";
import Image from "next/image";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import clsx from "clsx";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { logout } from "@/libs/auth/logout";

const navigation = [
  { name: "Dashboard Overview", href: "/admin-dashboard" },
  { name: "Menu Management", href: "/menu-management" },
  { name: "Reservations", href: "/all-reservations" },
  { name: "Reviews", href: "/all-reviews" },
];

const NavbarAdmin = () => {
  const { activeSection, authMobileMenuOpen, setAuthMobileMenuOpen } =
    useLittleLemonStore();

  const avatarUrl = "/admin/admin.avif";

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur">
      <nav className="mx-auto max-w-7xl flex items-center px-6 py-3">
        {/* Logo - izquierda */}
        <div className="flex flex-1">
          <Link href="/#home" className="flex items-center">
            <Image
              priority
              width={1000}
              height={1000}
              alt="Little Lemon Logo"
              src="/logo/logo4.webp"
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Links - centro */}
        <div className="hidden lg:flex gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "relative text-sm text-gray-600 font-medium transition hover:text-green-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full",
                {
                  "text-green-600 after:w-full font-semibold":
                    activeSection === item.name,
                }
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Avatar - derecha */}
        <div className="flex flex-1 justify-end">
          <button
            onClick={() => setAuthMobileMenuOpen(true)}
            className="focus:outline-none focus:ring-2 focus:ring-green-600 rounded-full"
          >
            <Image
              priority
              width={1000}
              height={1000}
              src={avatarUrl}
              alt="User Avatar"
              className="size-10 rounded-full object-cover border border-green-300 hover:ring-2 hover:ring-green-500 transition-colors cursor-pointer"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={authMobileMenuOpen} onClose={setAuthMobileMenuOpen}>
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl px-6 py-6 overflow-y-auto">
          {/* Header móvil */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/#home" onClick={() => setAuthMobileMenuOpen(false)}>
              <Image
                priority
                width={1000}
                height={1000}
                alt="Little Lemon Logo"
                src="/logo/logo4.webp"
                className="h-14 w-auto"
              />
            </Link>
            <button
              onClick={() => setAuthMobileMenuOpen(false)}
              className="p-2 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setAuthMobileMenuOpen(false)}
                className={clsx(
                  "block rounded px-3 py-2 text-base text-gray-800 hover:bg-gray-100 hover:text-green-600 transition",
                  {
                    "bg-gray-100 text-green-600 font-semibold":
                      activeSection === item.name,
                  }
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* Logout */}
            <button
              onClick={() => {
                setAuthMobileMenuOpen(false);
                logout();
              }}
              className="w-full mt-4 text-left rounded px-3 py-2 text-base text-red-500 hover:bg-gray-100 hover:text-red-600 transition"
            >
              Logout
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default NavbarAdmin;
