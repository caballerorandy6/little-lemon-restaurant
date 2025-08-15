"use client";

import Image from "next/image";
import useSectionObserver from "@/libs/hooks/useSectionObserver";
import { useReviewStore } from "@/store/review-store";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { userNameSimulation } from "@/libs/utils";

const Reviews = () => {
  const { reviews } = useReviewStore();
  const { user } = useLittleLemonStore();

  const ref = useSectionObserver({ sectionName: "Reviews" });

  const avatarUrl = userNameSimulation(user?.name || "No Name");

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-10 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-green-400 to-yellow-400"
        />
      </div>

      <div className="relative isolate">
        <div className="mx-auto max-w-2xl text-center mb-20 animate-fadeIn">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
            TESTIMONIALS
          </span>
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            What people are{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500">
              saying
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto">
            Discover why our guests keep coming back for more than just a meal
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-1 w-16 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-yellow-500 to-green-400 rounded-full"></div>
            <div className="h-1 w-8 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="mt-16 text-center animate-fadeInUp">
            <div className="inline-flex flex-col items-center p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl">
              <svg
                className="w-16 h-16 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-gray-500 text-lg">No reviews yet.</p>
              <p className="text-gray-400 text-sm mt-2">
                Be the first to share your experience!
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto grid max-w-2xl grid-cols-1 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <figure
                key={review.id}
                className={`group relative rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ring-1 ring-gray-100 hover:ring-green-200 animate-fadeInUp animation-delay-${200 + index * 100}`}
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <svg
                  className="absolute top-6 left-6 w-8 h-8 text-green-100 -z-10"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="relative">
                  <p className="text-gray-700 text-base leading-relaxed italic">
                    {`"${review.comment}"`}
                  </p>
                </blockquote>

                <div className="mt-6 mb-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                <figcaption className="flex items-center gap-x-4">
                  <div className="relative">
                    <Image
                      width={500}
                      height={500}
                      alt=""
                      src={avatarUrl}
                      className="w-12 h-12 rounded-full bg-gray-50 ring-2 ring-white shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                      {review.user?.name || "Anonymous"}
                    </div>
                    <div className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs font-medium text-green-700">
                      Verified
                    </span>
                  </div>
                </figcaption>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-20"></div>
              </figure>
            ))}
          </div>
        )}

        {reviews.length > 0 && (
          <div className="mt-16 text-center animate-fadeIn animation-delay-1000">
            <div className="inline-flex flex-col items-center p-8 bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Join our community of food lovers
              </p>
              <p className="text-gray-600 text-sm">
                Share your Little Lemon experience with others
              </p>
              <button className="mt-6 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Write a Review
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
