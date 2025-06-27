"use client";
import { useEffect } from "react";
import { useReservationStore } from "@/store/reservation-store";
import { useAuth } from "@/libs/hooks/useAuth";
import { getUserReservations } from "@/libs/utils";

export default function ReservationsCards() {
  const { userReservations, setUserReservations } = useReservationStore();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchReservations = async () => {
      if (isAuthenticated) {
        try {
          const reservationData = await getUserReservations();
          setUserReservations(reservationData);
        } catch (err) {
          console.error("Cart fetch failed:", err);
        }
      }
    };
    fetchReservations();
  }, [isAuthenticated, setUserReservations]);

  return (
    <div className="border border-gray-200 bg-white/80 backdrop-blur p-8 rounded-lg shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div>
            <h1 className="text-base font-semibold text-gray-900">
              Randy Caballero
            </h1>
            <p className="mt-2 text-sm text-gray-700">Reservation History</p>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <table className="w-full text-left">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                >
                  Date
                  <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                  <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                >
                  Guests
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                >
                  Status
                </th>

                <th scope="col" className="relative py-3.5 pl-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {userReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                    {new Date(
                      `${reservation.date}T12:00:00`
                    ).toLocaleDateString("en-US")}
                    <div className="absolute right-full bottom-0 h-px w-screen bg-gray-100" />
                    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {reservation.time}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                    {reservation.guests}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                    {reservation.status === "ACTIVE" ? (
                      <span className="text-green-700 font-semibold bg-green-200 rounded-md px-2 py-1">
                        ACTIVE
                      </span>
                    ) : reservation.status === "EXPIRED" ? (
                      <span className="text-gray-500 font-semibold bg-gray-200 rounded-md px-2 py-1">
                        EXPIRED
                      </span>
                    ) : reservation.status === "CANCELLED" ? (
                      <span className="text-red-500 font-semibold bg-red-200 rounded-md px-2 py-1">
                        CANCELLED
                      </span>
                    ) : (
                      reservation.status
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
