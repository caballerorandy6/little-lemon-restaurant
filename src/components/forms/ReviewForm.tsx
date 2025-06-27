"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, ReviewFormData } from "@/libs/zod";
import { toast } from "sonner";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import SmallSpinner from "@/components/spinners/SmallSpinner";
import clsx from "clsx";
import { useReviewStore } from "@/store/review-store";

const ReviewForm = () => {
  const { user } = useLittleLemonStore();
  const { setShowReviewForm } = useReviewStore();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    mode: "onChange",
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("Failed to submit review. Please try again.");
        return;
      }

      const result = await response.json();
      toast.success("Review submitted successfully!");
      reset();
      setShowReviewForm(false);
      router.refresh();
      console.log("Review submitted:", result);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred while submitting your review.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 border border-gray-300 bg-white p-6 rounded-md shadow-sm"
    >
      {/* Name */}
      <div>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm">
            Your Name
          </label>
          <div className="mt-2">
            <input
              disabled
              id="userName"
              type="text"
              readOnly
              value={user?.name || "Anonymous"}
              className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300 bg-gray-200 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm">
            Rate our restaurant
          </label>
          <div className="mt-2">
            <input
              type="number"
              id="rating"
              {...register("rating", { valueAsNumber: true })}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
            />
            <ErrorMessage
              errors={errors}
              name="rating"
              render={({ message }) => (
                <p className="text-red-500 text-sm mt-1">{message}</p>
              )}
            />
          </div>
        </div>

        {/* Comments */}
        <div>
          <label htmlFor="comment" className="block text-sm">
            Comments
          </label>
          <div className="mt-2">
            <textarea
              id="comment"
              {...register("comment")}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
            />
            <ErrorMessage
              errors={errors}
              name="comment"
              render={({ message }) => (
                <p className="text-red-500 text-sm mt-1">{message}</p>
              )}
            />
          </div>
        </div>
      </div>

      <input
        type="hidden"
        value={1} // o el ID que asignaste al meal general
        {...register("mealId", { valueAsNumber: true })}
      />

      <div className="mt-10">
        <button
          id="reserve-button"
          type="submit"
          disabled={!isValid || isSubmitting}
          className={clsx(
            "flex justify-center items-center rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none mx-auto"
          )}
        >
          {isSubmitting ? <SmallSpinner /> : "Submit Review"}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
