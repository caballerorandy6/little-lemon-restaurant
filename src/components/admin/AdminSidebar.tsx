"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CurrentUserClient from "@/components/public/CurrentUserClient";
import { userNameSimulation } from "@/libs/utils";
import { useLittleLemonStore } from "@/store/little-lemon-store";

const navigation = [
  { name: "Dashboard Overview", href: "/admin-dashboard" },
  { name: "Menu Management", href: "/menu-management" },
  { name: "Reservations", href: "/all-reservations" },
  { name: "Reviews", href: "/all-reviews" },
];

const AdminSidebar = () => {
  const { user, openAdminDialog, setOpenAdminDialog } = useLittleLemonStore();
  const avatarUrl = userNameSimulation(user?.name || "No Name");

  return (
    <header>
      {/* Mobile Sidebar */}
      <Dialog
        open={openAdminDialog}
        onClose={() => setOpenAdminDialog(false)}
        className="relative z-50 lg:hidden "
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs transform bg-white p-6">
            <TransitionChild>
              <button
                onClick={() => setOpenAdminDialog(false)}
                className="absolute top-4 right-4"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </TransitionChild>
            <nav className="mt-8 space-y-4">
              <CurrentUserClient />
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpenAdminDialog(false)}
                  className="block text-lg text-gray-700 hover:text-green-800"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </DialogPanel>
        </div>
      </Dialog>
      {/* Static sidebar (desktop) */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <nav className="pt-24 mt-6 flex-1 space-y-1 px-2">
          <CurrentUserClient />
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-800"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-6">
          <Image
            src={avatarUrl}
            width={40}
            height={40}
            className="rounded-full"
            alt="Avatar"
          />
        </div>
      </div>
      {/* Top bar mobile */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-white px-4 py-2 shadow lg:hidden">
        <button onClick={() => setOpenAdminDialog(true)}>
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default AdminSidebar;
