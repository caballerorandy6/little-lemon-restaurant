import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ReservationAPI } from "@/libs/types";
import {} from "../libs/utils";
import { deleteReservationById, updateReservationById } from "@/libs/utils";

interface ReservationStore {
  userReservations: ReservationAPI[];
  setUserReservations: (reservations: ReservationAPI[]) => void;
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
}

export const useReservationStore = create<ReservationStore>()(
  persist(
    (set) => ({
      isLoading: false,

      setIsLoading: (loading) => set({ isLoading: loading }),

      userReservations: [],

      setUserReservations: (reservations) => {
        set({ userReservations: reservations });
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
          if (!updated) throw new Error("Failed to update reservation");
          set((state) => ({
            userReservations: state.userReservations.map((r) =>
              r.id === updated.id ? updated : r
            ),
            editingId: null,
            editReservationValues: null,
          }));

          console.log("Reservation updated successfully:", updated);
        } catch (e) {
          console.error("Error updating reservation:", e);
        } finally {
          set({ isLoading: false });
        }
      },

      editingId: null,

      setEditingId: (id: number | null) => set({ editingId: id }),

      editReservationValues: {
        date: "",
        time: "",
        guests: 0,
        id: 0,
        userId: 0,
        status: "ACTIVE",
      },

      setEditReservationValues: (values) =>
        set({ editReservationValues: values }),

      isHydrated: false,

      setIsHydrated: (value) => set({ isHydrated: value }),
    }),
    {
      name: "reservation-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
