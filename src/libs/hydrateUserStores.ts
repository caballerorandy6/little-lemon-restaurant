"use client";

import { useReservationStore } from "@/store/reservation-store";
import { useReviewStore } from "@/store/review-store";
import { isReservationExpired, updateReservationById } from "./utils";
import { ReservationAPI } from "./types";

export const hydrateUserStores = async () => {
  try {
    const [responseReviews, responseReservations] = await Promise.all([
      fetch("/api/reviews", { credentials: "include" }),
      fetch("/api/reservations", { credentials: "include" }),
    ]);

    if (!responseReviews.ok || !responseReservations.ok) {
      throw new Error("Failed to fetch user data");
    }

    const [reviews, rawReservations] = await Promise.all([
      responseReviews.json(),
      responseReservations.json(),
    ]);

    const reservations = rawReservations.reservations ?? [];

    const updatedReservations = await Promise.all(
      reservations.map(async (res: ReservationAPI) => {
        const isExpiredNow = isReservationExpired(res);
        if (isExpiredNow && res.status === "ACTIVE") {
          const updated = await updateReservationById({
            ...res,
            status: "EXPIRED",
          });
          return updated ?? { ...res, status: "EXPIRED" };
        }
        return res;
      })
    );

    const { setUserReservations, setIsHydrated: setReservationHydrated } =
      useReservationStore.getState();
    const { setReviews, setHydrated: setReviewHydrated } =
      useReviewStore.getState();

    setUserReservations(updatedReservations);
    setReservationHydrated(true);

    setReviews(reviews);
    setReviewHydrated(true);
  } catch (error) {
    console.error("Error hydrating user stores:", error);
  }
};
