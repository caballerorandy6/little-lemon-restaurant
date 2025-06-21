import React from "react";

const CartSkeleton = () => {
  return (
    <div className="bg-white mt-20 animate-pulse">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="h-10 bg-gray-200 rounded w-48 mb-6"></div>

        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section className="lg:col-span-7 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex py-6 sm:py-10 border-t border-b border-gray-200"
              >
                <div className="size-24 sm:size-48 rounded-md bg-gray-200 shrink-0"></div>
                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />

                  <div className="h-10 w-24 bg-gray-300 rounded mb-2"></div>
                  <div className="h-5 w-5 bg-gray-300 rounded-full absolute top-0 right-0"></div>
                </div>
              </div>
            ))}
          </section>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-10 bg-gray-300 rounded w-full mt-6" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
