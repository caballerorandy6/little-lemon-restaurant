"use client";

import { useEffect } from "react";
import { useLittleLemonStore } from "@/store/little-lemon-store";

export default function ReservationList() {
  const {
    user,
    userReservations,
    fetchUserReservations,
    deleteReservationById,
    updateReservation,
    editingId,
    setEditingId,
    editReservationValues,
    setEditReservationValues,
  } = useLittleLemonStore();

  useEffect(() => {
    if (user) {
      fetchUserReservations();
    }
  }, [user, fetchUserReservations]);

  return (
    <section className="bg-white/80 backdrop-blur p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-10 mb-20">
      <div className="sm:flex sm:items-center justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">
            {user?.name}
          </h1>
          <p className="mt-2 text-sm text-gray-700">Reservation History</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          >
            Export PDF
          </button>
        </div>
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
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {userReservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="py-2 pr-3 pl-4 text-sm text-gray-500 sm:pl-0">
                      {editingId === reservation.id ? (
                        <input
                          type="date"
                          value={
                            editReservationValues?.date?.slice(0, 10) || ""
                          }
                          onChange={(e) =>
                            setEditReservationValues({
                              ...editReservationValues!,
                              date: e.target.value,
                            })
                          }
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        new Date(reservation.date).toLocaleDateString("en-US")
                      )}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-900">
                      {editingId === reservation.id ? (
                        <input
                          type="time"
                          value={editReservationValues?.time || ""}
                          onChange={(e) =>
                            setEditReservationValues({
                              ...editReservationValues!,
                              time: e.target.value,
                            })
                          }
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        reservation.time
                      )}
                    </td>
                    <td className="px-2 py-2 text-sm">
                      {editingId === reservation.id ? (
                        <input
                          type="number"
                          min="1"
                          value={editReservationValues?.guests || 1}
                          onChange={(e) =>
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
                    <td className="px-2 py-2 text-sm text-gray-500">
                      {user?.email}
                    </td>
                    <td className="relative flex justify-end gap-4 py-2 pr-4 pl-3 text-sm sm:pr-0">
                      {editingId === reservation.id ? (
                        <>
                          <button
                            onClick={async () => {
                              if (
                                reservation.id &&
                                editReservationValues?.date &&
                                editReservationValues?.time &&
                                typeof editReservationValues.guests === "number"
                              ) {
                                await updateReservation({
                                  id: reservation.id,
                                  date: editReservationValues.date,
                                  time: editReservationValues.time,
                                  guests: editReservationValues.guests,
                                  userId: reservation.userId as number,
                                });
                                setEditingId(null);
                                setEditReservationValues(null);
                              }
                            }}
                            className="text-green-700 hover:text-green-600 bg-gray-100 hover:bg-green-100 p-2 rounded-md cursor-pointer transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditReservationValues(null);
                            }}
                            className="text-red-500 hover:text-red-400 bg-gray-100 hover:bg-red-100 p-2 rounded-md cursor-pointer transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              if (typeof reservation.userId === "number") {
                                setEditReservationValues({
                                  date: reservation.date,
                                  time: reservation.time,
                                  guests: reservation.guests,
                                  userId: reservation.userId,
                                  id: reservation.id,
                                });
                                setEditingId(reservation.id ?? null);
                              }
                            }}
                            className="text-green-700 hover:text-green-600 bg-gray-100 hover:bg-green-100 p-2 rounded-md cursor-pointer transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (reservation.id !== undefined) {
                                deleteReservationById(reservation.id);
                              }
                            }}
                            className="text-red-500 hover:text-red-400 bg-gray-100 hover:bg-red-100 p-2 rounded-md cursor-pointer transition-colors"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
