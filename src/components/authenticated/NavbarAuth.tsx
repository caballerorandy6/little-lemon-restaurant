"use client";

import Link from "next/link";
import Image from "next/image";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import clsx from "clsx";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { logout } from "@/libs/auth/logout";
import { userNameSimulation } from "@/libs/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Menu", href: "/menu" },
  { name: "Reservations", href: "/reservations" },
  { name: "Reviews", href: "/#reviews" },
  { name: "Contact", href: "/#contact" },
];

const NavbarAuth = () => {
  const { activeSection, user, authMobileMenuOpen, setAuthMobileMenuOpen } =
    useLittleLemonStore();

  //console.log("user", user);

  const avatarUrl = userNameSimulation(user?.name || "No Name");

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex items-center justify-between px-8 py-4 font-bold fixed w-full transition-all nav-blur duration-300">
        <div className="flex lg:flex-1">
          <Link href="/#home" className="-m-1.5 p-1.5">
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
        {/* Avatar (always visible) */}
        <div className="flex lg:flex-1 justify-end">
          <button
            type="button"
            onClick={() => setAuthMobileMenuOpen(true)}
            className=""
          >
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
      </nav>

      {/* Mobile menu (Dialog) */}
      <Dialog open={authMobileMenuOpen} onClose={setAuthMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Little Lemon</span>
              <Image
                priority
                width={1000}
                height={1000}
                alt="Little Lemon Logo"
                src="/logo/logo4.webp"
                className="h-20 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setAuthMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                aria-hidden="true"
                className="size-6 cursor-pointer hover:bg-gray-100 rounded transition-colors"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    onClick={() => setAuthMobileMenuOpen(false)}
                    href={item.href}
                    className={clsx(
                      "-mx-3 block rounded-lg px-3 py-2 text-base/7 text-gray-900 hover:bg-gray-50 transition-colors",
                      {
                        "bg-gray-50 text-green-800 font-semibold":
                          activeSection === item.name,
                      }
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <button
                  onClick={() => {
                    setAuthMobileMenuOpen(false);
                    logout();
                  }}
                  className="-mx-3 rounded-lg px-3 py-2.5 text-base/7 text-gray-900 hover:text-red-400 hover:bg-gray-50 transition-colors w-full flex cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default NavbarAuth;
