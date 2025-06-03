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
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex items-center justify-between px-8 py-4 fixed w-full transition-all nav-blur duration-300">
        <div className="flex lg:flex-1">
          <Link href="/#home" className="-m-1.5 p-1.5">
            <Image
              priority
              width={1000}
              height={1000}
              alt="Little Lemon Logo"
              src="/logo/logo3.webp"
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "relative text-sm text-gray-500 font-sans transition-colors duration-300 ease-in-out hover:text-green-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full",
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

        {/* Avatar (siempre visible en desktop) */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          <ShoppingCart />
          <button onClick={() => setAvatarMenuOpen(true)}>
            <Image
              priority
              width={1000}
              height={1000}
              className="size-8 rounded-full cursor-pointer"
              src={avatarUrl}
              alt="User profile"
            />
          </button>
        </div>

        {/* Botón menú móvil (hamburguesa) */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setAuthMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon className="size-6 cursor-pointer" />
          </button>
        </div>
      </nav>

      {/* Menú Móvil (hamburguesa) */}
      <Dialog
        open={authMobileMenuOpen}
        onClose={() => setAuthMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/#home" className="-m-1.5 p-1.5">
              <Image
                priority
                width={1000}
                height={1000}
                alt="Little Lemon Logo"
                src="/logo/logo5.webp"
                className="h-20 w-auto"
              />
            </Link>
            <button
              onClick={() => setAuthMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon className="size-6 cursor-pointer hover:bg-gray-100 rounded transition-colors" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    onClick={() => setAuthMobileMenuOpen(false)}
                    href={item.href}
                    className={clsx(
                      "-mx-3 block rounded-lg px-3 py-2 text-base text-gray-900 hover:bg-gray-50 transition-colors",
                      {
                        "bg-gray-50 text-green-800":
                          activeSection === item.name,
                      }
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <ShoppingCart />
              </div>
              <div className="py-6">
                <button
                  onClick={() => {
                    setAuthMobileMenuOpen(false);
                    logout();
                  }}
                  className="-mx-3 rounded-lg px-3 py-2.5 text-base text-gray-900 hover:text-red-400 hover:bg-gray-50 transition-colors w-full flex cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      {/* Menú del Avatar */}
      <Dialog open={avatarMenuOpen} onClose={() => setAvatarMenuOpen(false)}>
        <div className="fixed inset-0 z-50 bg-black/20" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/#home" className="-m-1.5 p-1.5">
              <Image
                priority
                width={1000}
                height={1000}
                alt="Little Lemon Logo"
                src="/logo/logo5.webp"
                className="h-20 w-auto"
              />
            </Link>
            <button
              onClick={() => setAvatarMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon className="size-6 cursor-pointer hover:bg-gray-100 rounded transition-colors" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <Link
              href="/user/profile"
              onClick={() => setAvatarMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base hover:bg-gray-50 transition-colors hover:text-green-600 "
            >
              View Profile
            </Link>
            <button
              onClick={() => {
                setAvatarMenuOpen(false);
                logout();
              }}
              className="block w-full text-left rounded-lg px-3 py-2 text-base hover:bg-gray-50  transition-colors cursor-pointer hover:text-red-400"
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
