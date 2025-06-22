"use client";

import React from "react";

export default function SingleMealSkeleton() {
  return (
    <div className="bg-white mt-20 animate-pulse">
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Image Skeleton */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-4/3 w-full rounded-lg bg-gray-200" />
            <div className="mt-6 h-12 w-1/3 bg-gray-200 rounded-md" />
          </div>

          {/* Details Skeleton */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded" />
                <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded" />
                <div className="mt-2 h-4 w-1/3 bg-gray-200 rounded" />
              </div>
              <div className="mt-4 h-6 w-1/4 bg-gray-200 rounded" />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div className="h-12 bg-gray-200 rounded-md" />
              <div className="h-12 bg-gray-200 rounded-md" />
            </div>

            {[...Array(4)].map((_, i) => (
              <div key={i} className="mt-10 border-t border-gray-200 pt-10">
                <div className="h-5 w-1/4 bg-gray-200 rounded mb-4" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
              </div>
            ))}

            <div className="mt-10 border-t border-gray-200 pt-10">
              <div className="h-5 w-1/4 bg-gray-200 rounded mb-4" />
              <div className="flex space-x-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 w-6 rounded-full bg-gray-200" />
                ))}
              </div>
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 w-24 bg-gray-200 rounded" />
                ))}
              </div>
            </div>

            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex space-x-4 text-sm text-gray-500 py-6"
              >
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
