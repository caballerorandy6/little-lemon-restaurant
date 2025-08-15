import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ReservationAPI } from "@/libs/types";
import {} from "../libs/utils";
import { deleteReservationById, updateReservationById } from "@/libs/utils";

interface ReservationStore {
  userReservations: ReservationAPI[];
  setUserReservations: (
    reservations:
      | ReservationAPI[]
      | ((prev: ReservationAPI[]) => ReservationAPI[])
  ) => void;
  deleteReservationById: (reservationId: number) => Promise<void>;
  updateReservation: (data: ReservationAPI) => Promise<void>;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  editReservationValues: ReservationAPI | null;
  setEditReservationValues: (values: ReservationAPI | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isHydrated: boolean;
  setIsHydrated: (hydrated: boolean) => void;
  addUserReservation: (reservation: ReservationAPI) => void;
  hasNewReservation: boolean;
  setHasNewReservation: (value: boolean) => void;
}

export const useReservationStore = create<ReservationStore>()(
  persist(
    (set) => ({
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),

      userReservations: [],
      setUserReservations: (reservations) => {
        set((state) => ({
          userReservations:
            typeof reservations === "function"
              ? reservations(state.userReservations)
              : reservations,
        }));
      },

      deleteReservationById: async (id) => {
        set({ isLoading: true });
        try {
          const res = await deleteReservationById(id);
          if (!res) throw new Error("Failed to delete reservation");
          set((state) => ({
            userReservations: state.userReservations.filter((r) => r.id !== id),
          }));
        } catch (e) {
          console.error("Error deleting reservation:", e);
        } finally {
          set({ isLoading: false });
        }
      },

      updateReservation: async (data) => {
        set({ isLoading: true });
        try {
          const updated = await updateReservationById(data);

          const updatedReservation: ReservationAPI = {
            ...updated,
            date:
              typeof updated.date === "string"
                ? updated.date
                : new Date(updated.date).toISOString().split("T")[0],
          };

          set((state) => ({
            userReservations: state.userReservations.map((r) =>
              r.id === updatedReservation.id ? updatedReservation : r
            ),
            editingId: null,
            editReservationValues: null,
          }));
        } catch (e) {
          console.error("Error updating reservation:", e);
        } finally {
          set({ isLoading: false });
        }
      },

      editingId: null,
      setEditingId: (id: number | null) => set({ editingId: id }),

      editReservationValues: null,
      setEditReservationValues: (values) =>
        set({ editReservationValues: values }),

      isHydrated: false,
      setIsHydrated: (value) => set({ isHydrated: value }),

      addUserReservation: (reservation) => {
        const fixedDate =
          typeof reservation.date === "string"
            ? reservation.date.split("T")[0]
            : new Date(reservation.date).toISOString().split("T")[0];

        const newReservation = {
          ...reservation,
          date: fixedDate,
        };

        set((state) => ({
          userReservations: [...state.userReservations, newReservation],
          isHydrated: true, // Ensure UI re-renders
        }));
      },

      hasNewReservation: false,
      setHasNewReservation: (value) => set({ hasNewReservation: value }),
    }),

    {
      name: "reservation-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userReservations: state.userReservations,
      }),
    }
  )
);
