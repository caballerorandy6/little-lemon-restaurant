"use client";

import { StarIcon } from "@heroicons/react/20/solid";
import { useReviewStore } from "@/store/review-store";
import ReviewForm from "@/components/forms/ReviewForm";
import ReviewList from "@/components/authenticated/ReviewList";

// const reviews = {
//   average: 4,
//   totalCount: 1624,
//   counts: [
//     { rating: 5, count: 1019 },
//     { rating: 4, count: 162 },
//     { rating: 3, count: 97 },
//     { rating: 2, count: 199 },
//     { rating: 1, count: 147 },
//   ],
//   featured: [
//     {
//       id: 1,
//       rating: 5,
//       content: `
//         <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
//       `,
//       author: "Emily Selman",
//       avatarSrc:
//         "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
//     },
//     // More reviews...
//   ],
// };

export default function CustomerReviews() {
  const { reviews, showReviewForm, setShowReviewForm } = useReviewStore();

  // Calculate the average rating
  const validReviews = Array.isArray(reviews)
    ? reviews.filter((r) => r && typeof r.rating === "number")
    : [];

  const totalCountReview = validReviews.length;

  const average =
    totalCountReview > 0
      ? validReviews.reduce((sum, r) => sum + r.rating, 0) / totalCountReview
      : 0;

  // Calculate the total count of reviews
  const totalCount = reviews.length;

  // Calculate the count of each rating
  const validReviewsR = Array.isArray(reviews)
    ? reviews.filter((r) => r && typeof r.rating === "number")
    : [];

  const counts = Array.from({ length: 5 }, (_, i) => ({
    rating: i + 1,
    count: validReviewsR.filter((review) => review.rating === i + 1).length,
  }));

  function classNames(
    ...classes: (string | undefined | false | null)[]
  ): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Reviews
          </h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      average > rating ? "text-yellow-400" : "text-gray-300",
                      "size-5 shrink-0"
                    )}
                  />
                ))}
              </div>
              <p className="sr-only">{average} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">
              Based on {totalCount} reviews
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {counts.map((count) => (
                <div key={count.rating} className="flex items-center text-sm">
                  <dt className="flex flex-1 items-center">
                    <p className="w-3 font-medium text-gray-900">
                      {count.rating}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div
                      aria-hidden="true"
                      className="ml-1 flex flex-1 items-center"
                    >
                      <StarIcon
                        aria-hidden="true"
                        className={classNames(
                          count.count > 0 ? "text-yellow-400" : "text-gray-300",
                          "size-5 shrink-0"
                        )}
                      />

                      <div className="relative ml-3 flex-1">
                        <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                        {count.count > 0 ? (
                          <div
                            style={{
                              width: `calc(${count.count} / ${totalCount} * 100%)`,
                            }}
                            className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right text-sm text-gray-900 tabular-nums">
                    {totalCount > 0
                      ? `${Math.round((count.count / totalCount) * 100)}%`
                      : "0%"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">
              Share your thoughts
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              If you have visited our restaurant, please share your opinion with
              other customers.
            </p>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 px-8 text-sm font-medium sm:w-auto lg:w-full  text-white hover:bg-yellow-400  py-2 shadow-xs bg-yellow-500 tfocus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 transition-colors cursor-pointer"
            >
              {showReviewForm ? "Hide Review Form" : "Write a Review"}
            </button>
            <div className="mt-10">
              {showReviewForm ? <ReviewForm /> : null}
            </div>
          </div>
        </div>

        <ReviewList />
      </div>
    </div>
  );
}
