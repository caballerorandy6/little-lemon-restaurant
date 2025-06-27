import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Review } from "@/libs/types";

interface ReviewStore {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  addReview: (review: Review) => void;
  removeReview: (id: number) => void;
  updateReview: (updatedReview: Review) => void;
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  showReviewForm: boolean;
  setShowReviewForm: (show: boolean) => void;
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      reviews: [],

      setReviews: (reviews) => set({ reviews }),

      addReview: (review) =>
        set((state) => ({ reviews: [...state.reviews, review] })),

      removeReview: (id) =>
        set((state) => ({
          reviews: state.reviews.filter((review) => review.id !== id),
        })),

      updateReview: (updatedReview) =>
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          ),
        })),

      isHydrated: false,

      setHydrated: (hydrated) => set({ isHydrated: hydrated }),

      showReviewForm: false,

      setShowReviewForm: (show) => set({ showReviewForm: show }),
    }),
    {
      name: "review-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
