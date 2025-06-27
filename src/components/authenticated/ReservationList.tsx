"use client";

import { useEffect } from "react";
import { useReservationStore } from "@/store/reservation-store";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import {
  formatTimeTo12Hour,
  getUserReservations,
  isReservationExpired,
} from "@/libs/utils";
import ReservationListSkeleton from "../skeletons/ReservationListSkeleton";
import { ReservationAPI } from "@/libs/types";
import clsx from "clsx";
import { toast } from "sonner";
import { sortedReservations } from "@/libs/utils";
import SmallSpinner from "@/components/spinners/SmallSpinner";
import { useAuth } from "@/libs/hooks/useAuth";

export default function ReservationList() {
  const {
    userReservations,
    //deleteReservationById,
    updateReservation,
    editingId,
    setEditingId,
    editReservationValues,
    setEditReservationValues,
    isHydrated,
    setUserReservations,
  } = useReservationStore();

  const { user } = useLittleLemonStore();
  const { isAuthenticated } = useAuth();

  //console.log("User Reservations:", userReservations);

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
    <section className="bg-white/80 backdrop-blur p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-10 mb-20">
      <div className="sm:flex sm:items-center justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">
            {user?.name}
          </h1>
          <p className="mt-2 text-sm text-gray-700">Reservation History</p>
        </div>
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          >
            Export PDF
          </button>
        </div> */}
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Date
                  </th>
                  <th className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Time
                  </th>
                  <th className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Guests
                  </th>
                  <th className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {!isHydrated ? (
                  <ReservationListSkeleton />
                ) : (
                  sortedReservations(userReservations).map(
                    (reservation: ReservationAPI) => (
                      <tr key={reservation.id}>
                        <td className="py-2 pr-3 pl-4 text-sm text-gray-500 sm:pl-0">
                          {editingId === reservation.id ? (
                            <input
                              type="date"
                              value={
                                editReservationValues?.date?.slice(0, 10) || ""
                              }
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setEditReservationValues({
                                  ...editReservationValues!,
                                  date: e.target.value,
                                })
                              }
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            new Date(
                              `${reservation.date}T12:00:00`
                            ).toLocaleDateString("en-US")
                          )}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900">
                          {editingId === reservation.id ? (
                            <input
                              type="time"
                              value={editReservationValues?.time || ""}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setEditReservationValues({
                                  ...editReservationValues!,
                                  time: e.target.value,
                                })
                              }
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            formatTimeTo12Hour(reservation.time)
                          )}
                        </td>
                        <td className="px-2 py-2 text-sm">
                          {editingId === reservation.id ? (
                            <input
                              type="number"
                              min="1"
                              value={editReservationValues?.guests || 1}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setEditReservationValues({
                                  ...editReservationValues!,
                                  guests: +e.target.value,
                                })
                              }
                              className="border rounded px-2 py-1 w-16"
                            />
                          ) : (
                            reservation.guests
                          )}
                        </td>
                        <td className="px-2 py-2 text-sm">
                          {editingId === reservation.id ? (
                            <select
                              value={editReservationValues?.status || "ACTIVE"}
                              disabled={!isHydrated}
                              onChange={(e) =>
                                setEditReservationValues({
                                  ...editReservationValues!,
                                  status: e.target.value as
                                    | "ACTIVE"
                                    | "EXPIRED"
                                    | "CANCELLED",
                                })
                              }
                              className={clsx(
                                "border rounded px-2 py-1 focus:outline-none focus:ring-0",
                                {
                                  "border-green-500 bg-green-100 text-green-700":
                                    editReservationValues?.status === "ACTIVE",
                                  "border-gray-500 bg-gray-200 text-gray-700":
                                    editReservationValues?.status === "EXPIRED",
                                  "border-red-500 bg-red-100 text-red-700":
                                    editReservationValues?.status ===
                                    "CANCELLED",
                                  "opacity-50 cursor-not-allowed": !isHydrated,
                                }
                              )}
                            >
                              <option value="ACTIVE">Active</option>
                              <option value="CANCELLED">Cancel</option>
                            </select>
                          ) : !isHydrated ? (
                            <SmallSpinner />
                          ) : reservation.status === "ACTIVE" ? (
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

                        {/* Action buttons */}
                        <td className="relative flex justify-end gap-4 py-2 pr-4 pl-3 text-sm sm:pr-0">
                          {editingId === reservation.id ? (
                            <>
                              <button
                                onClick={async () => {
                                  if (
                                    reservation.id &&
                                    editReservationValues?.date &&
                                    editReservationValues?.time &&
                                    typeof editReservationValues.guests ===
                                      "number"
                                  ) {
                                    const updatedReservation = {
                                      ...reservation,
                                      ...editReservationValues,
                                    };

                                    //  Validate if the reservation is expired
                                    if (
                                      updatedReservation.status === "EXPIRED" &&
                                      !isReservationExpired(updatedReservation)
                                    ) {
                                      toast.error(
                                        "Reservation is not expired yet. But you can cancel it."
                                      );
                                      return;
                                    }

                                    await updateReservation(updatedReservation);
                                    setEditingId(null);
                                    setEditReservationValues(null);
                                  }
                                }}
                                className="text-green-700 bg-green-100 hover:bg-green-200 p-2 rounded-md cursor-pointer transition-colors"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(null);
                                  setEditReservationValues(null);
                                }}
                                className="text-red-500 bg-red-100 hover:bg-red-200 p-2 rounded-md cursor-pointer transition-colors"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                disabled={
                                  reservation.status === "EXPIRED" ||
                                  reservation.status === "CANCELLED"
                                }
                                onClick={() => {
                                  if (typeof reservation.userId === "number") {
                                    setEditReservationValues({
                                      ...reservation,
                                    });
                                    setEditingId(reservation.id ?? null);
                                  }
                                }}
                                className={clsx(
                                  "bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md cursor-pointer transition-colors",
                                  {
                                    "opacity-50 pointer-events-none cursor-not-allowed":
                                      reservation.status === "EXPIRED" ||
                                      reservation.status === "CANCELLED",
                                  }
                                )}
                              >
                                Edit
                              </button>
                              {/* <button
                              onClick={() => {
                                if (reservation.id !== undefined) {
                                  deleteReservationById(reservation.id);
                                }
                              }}
                              className="text-red-500 hover:text-red-400 bg-gray-100 hover:bg-red-100 p-2 rounded-md cursor-pointer transition-colors"
                            >
                              Delete
                            </button> */}
                            </>
                          )}
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
