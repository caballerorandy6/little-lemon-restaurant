import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Review } from "@/libs/types";

interface ReviewStore {
  reviews: Review[];
  setReviews: (value: Review[] | ((prev: Review[]) => Review[])) => void;
  addReview: (review: Review) => void;
  removeReview: (id: number) => void;
  updateReview: (updatedReview: Review) => void;
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  showReviewForm: boolean;
  setShowReviewForm: (show: boolean) => void;
  hovered: number | null;
  setHovered: (id: number | null) => void;
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      reviews: [],

      setReviews: (reviews) =>
        set((state) => ({
          reviews:
            typeof reviews === "function" ? reviews(state.reviews) : reviews,
        })),

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

      hovered: null,

      setHovered: (id) => set({ hovered: id }),
    }),
    {
      name: "review-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
