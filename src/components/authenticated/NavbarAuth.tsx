"use client";

import Link from "next/link";
import Image from "next/image";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import clsx from "clsx";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { logout } from "@/libs/auth/logout";
import { userNameSimulation } from "@/libs/utils";
import ShoppingCart from "@/components/public/ShoppingCart";
import CurrentUserClient from "@/components/public/CurrentUserClient";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Menu", href: "/menu" },
  { name: "Reservations", href: "/reservations" },
  { name: "Reviews", href: "/#reviews" },
  { name: "Contact", href: "/#contact" },
];

const NavbarAuth = () => {
  const {
    activeSection,
    user,
    setAuthMobileMenuOpen,
    authMobileMenuOpen,
    avatarMenuOpen,
    setAvatarMenuOpen,
  } = useLittleLemonStore();

  const avatarUrl = userNameSimulation(user?.name || "No Name");

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-gray-200">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/#home" className="flex items-center">
          <Image
            priority
            width={1000}
            height={1000}
            alt="Little Lemon Logo"
            src="/logo/logo3.webp"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
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

        {/* Desktop Right: Avatar + Cart */}
        <div className="hidden lg:flex items-center gap-4">
          <ShoppingCart />
          <button
            onClick={() => setAvatarMenuOpen(true)}
            className="focus:outline-none cursor-pointer"
          >
            <Image
              priority
              width={1000}
              height={1000}
              src={avatarUrl}
              alt="User Avatar"
              className="size-8 rounded-full object-cover border border-gray-300 hover:ring-2 hover:ring-green-500 transition"
            />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setAuthMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={authMobileMenuOpen}
        onClose={setAuthMobileMenuOpen}
        className="lg:hidden"
      >
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl px-6 py-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/#home" onClick={() => setAuthMobileMenuOpen(false)}>
              <Image
                priority
                width={1000}
                height={1000}
                alt="Little Lemon Logo"
                src="/logo/logo5.webp"
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

            <ShoppingCart />

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

      {/* Avatar Menu (Dialog style) */}
      <Dialog open={avatarMenuOpen} onClose={() => setAvatarMenuOpen(false)}>
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/#home" onClick={() => setAvatarMenuOpen(false)}>
              <Image
                priority
                width={1000}
                height={1000}
                alt="Little Lemon Logo"
                src="/logo/logo5.webp"
                className="h-14 w-auto"
              />
            </Link>
            <button
              onClick={() => setAvatarMenuOpen(false)}
              className="p-2 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <CurrentUserClient />
            <Link
              href="/user/profile"
              onClick={() => setAvatarMenuOpen(false)}
              className="block rounded px-3 py-2 text-base hover:bg-gray-100 hover:text-green-600 transition cursor-pointer"
            >
              View Profile
            </Link>
            <button
              onClick={() => {
                setAvatarMenuOpen(false);
                logout();
              }}
              className="w-full text-left rounded px-3 py-2 text-base text-red-500 hover:bg-gray-100 hover:text-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default NavbarAuth;
