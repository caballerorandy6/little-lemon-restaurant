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
      className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8"
    >
      <div className="relative isolate bg-white pt-24 pb-32 sm:pt-32">
        {/* Fondo decorativo */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="ml-[max(50%,38rem)] aspect-1313/771 w-328.25 bg-linear-to-tr from-[#ff80b5] to-[#9089fc]"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              What people are saying
            </h2>
          </div>

          {reviews.length === 0 ? (
            <p className="mt-16 text-center text-gray-500">No reviews yet.</p>
          ) : (
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-cols-3 gap-8 text-sm/6 text-gray-900">
              {reviews.map((review) => (
                <figure
                  key={review.id}
                  className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                >
                  <blockquote className="text-gray-900">
                    <p>{`“${review.comment}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <Image
                      width={500}
                      height={500}
                      alt=""
                      src={avatarUrl}
                      className="size-10 rounded-full bg-gray-50"
                    />
                    <div>
                      <div className="font-semibold">
                        {review.user?.name || "Anonymous"}
                      </div>
                      <div className="text-gray-600 text-xs">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
