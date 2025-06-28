"use client";

//import { useEffect } from "react";
import Image from "next/image";
import { useReviewStore } from "@/store/review-store";
import { userNameSimulation } from "@/libs/utils";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { StarIcon } from "@heroicons/react/16/solid";
// import { getReviews } from "@/libs/utils";
import { useAuth } from "@/libs/hooks/useAuth";
import ReviewSkeleton from "@/components/skeletons/ReviewSkeleton";

const ReviewList = () => {
  const { reviews, isHydrated } = useReviewStore();
  const { user } = useLittleLemonStore();
  const { isAuthenticated } = useAuth();

  console.log("CustomerReviews", { reviews, user });

  const avatarUrl = userNameSimulation(user?.name || "No Name");

  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  function classNames(
    ...classes: (string | undefined | false | null)[]
  ): string {
    return classes.filter(Boolean).join(" ");
  }

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     if (isAuthenticated && !isHydrated) {
  //       try {
  //         const reviewData = await getReviews();
  //         setReviews(reviewData);
  //         setHydrated(true);
  //       } catch (error) {
  //         console.error("Error fetching reviews:", error);
  //       }
  //     }
  //   };
  //   fetchReviews();
  // }, [isAuthenticated, isHydrated, setReviews, setHydrated]);

  return (
    <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0 border border-gray-200 bg-white/80 backdrop-blur p-8 rounded-lg shadow-md">
      <div className="flow-root">
        <div className="-my-12 divide-y divide-gray-200">
          {!isHydrated ? (
            // Mostrar skeletons mientras no se hidrata Zustand
            Array.from({ length: 3 }).map((_, i) => <ReviewSkeleton key={i} />)
          ) : sortedReviews.length === 0 && isAuthenticated ? (
            // Mostrar mensaje si no hay reviews
            <p className="text-2xl font-bold tracking-tight text-gray-900 mt-10">
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            // Mostrar los reviews una vez esté hidratado
            <>
              <div className="flex items-center gap-x-4 py-12">
                <Image
                  width={500}
                  height={500}
                  alt={"User Avatar"}
                  src={avatarUrl}
                  className="size-12 rounded-full"
                />
                <p className="text-2xl font-bold tracking-tight text-gray-900">
                  {user?.name || "Anonymous"}&#39;s Reviews
                </p>
              </div>
              {sortedReviews.map((review, index) => (
                <div
                  key={review?.id ?? `${review?.createdAt}-${index}`}
                  className="py-12 flex justify-between items-center "
                >
                  <div className="ml-4 space-y-2">
                    <div className="text-xs text-gray-500">
                      {new Date(review?.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={classNames(
                            review?.rating > rating
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "w-5 h-5 shrink-0"
                          )}
                        />
                      ))}
                      <span className="sr-only">
                        {review?.rating} out of 5 stars
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    {review?.comment}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
