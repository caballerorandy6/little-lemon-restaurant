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
import { userNameSimulation } from "@/libs/utils";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import DashboardOverview from "@/components/admin/DashboardOverview";
import AllReservations from "@/components/admin/AllReservations";
import AllReviews from "@/components/admin/AllReviews";
import MenuManagement from "@/components/admin/MenuManagement";
import CurrentUserClient from "@/components/public/CurrentUserClient";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Menu", href: "/menu" },
  { name: "Reservations", href: "/reservations" },
  { name: "Reviews", href: "/reviews" },
];

export default function AdminDashboard() {
  const { user, openAdminDialog, setOpenAdminDialog } = useLittleLemonStore();
  const avatarUrl = userNameSimulation(user?.name || "No Name");

  return (
    <section className="min-h-screen mt-20">
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

      {/* Contenido principal dividido en secciones */}
      <main className="lg:pl-72">
        {/* Dashboard */}
        <section id="dashboard" className="px-6 py-10">
          <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
          <DashboardOverview />
        </section>

        {/* Menu */}
        <section id="menu" className="bg-gray-50 px-6 py-10">
          <h2 className="text-2xl font-bold mb-4">Menu Management</h2>
          <MenuManagement />
        </section>

        {/* Reservations */}
        <section id="reservations" className="px-6 py-10">
          <h2 className="text-2xl font-bold mb-4">Reservations</h2>
          <AllReservations />
        </section>

        {/* Reviews */}
        <section id="reviews" className="bg-gray-50 px-6 py-10">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <AllReviews />
        </section>
      </main>
    </section>
  );
}
