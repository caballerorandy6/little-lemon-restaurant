"use client";

import DashboardOverview from "@/components/admin/DashboardOverview";
import AllReservations from "@/components/admin/AllReservations";
import AllReviews from "@/components/admin/AllReviews";
import MenuManagement from "@/components/admin/MenuManagement";

export default function AdminDashboard() {
  return (
    <section id="admin-dashboard" className="min-h-screen mt-20">
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
