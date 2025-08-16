"use client";

import { useEffect, useTransition } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useCategoryStore } from "@/store/category-store";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { CategoryAPI } from "@/libs/types";

export default function SidebarCategories() {
  const {
    categories,
    openCategoryListDialog,
    setOpenCategoryListDialog,
    setSelectedCategory,
    selectedCategory,
    initializeSelectedCategory,
  } = useCategoryStore();

  const [isPending, startTransition] = useTransition();

  // Initialize selected category on mount
  useEffect(() => {
    initializeSelectedCategory();
  }, [categories, initializeSelectedCategory]);

  const handleCategorySelect = (item: CategoryAPI) => {
    console.log("Selecting category:", item);
    startTransition(() => {
      setSelectedCategory(item);
      setOpenCategoryListDialog(false);
    });
  };

  return (
    <>
      {/* Mobile sidebar dialog */}
      <Dialog
        open={openCategoryListDialog}
        onClose={setOpenCategoryListDialog}
        className="relative z-50 sm:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative flex w-full max-w-xs bg-white shadow-2xl">
            <TransitionChild>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600"></div>
            </TransitionChild>

            <div className="w-full flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <Image
                  className="h-12 w-auto"
                  src="/logo/logo6.webp"
                  alt="Little Lemon Logo"
                  width={100}
                  height={100}
                  priority
                />
                <button
                  type="button"
                  onClick={() => setOpenCategoryListDialog(false)}
                  className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Categories Title */}
              <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-yellow-50">
                <h3 className="text-lg font-bold text-gray-800">
                  Menu Categories
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedCategory
                    ? `Current: ${selectedCategory.strCategory}`
                    : "Select a category to explore"}
                </p>
              </div>

              {/* Categories List */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <ul className="space-y-2">
                  {categories.map((item, index) => {
                    const isSelected = selectedCategory?.id === item.id;
                    return (
                      <li
                        key={item.id}
                        className="animate-fadeInUp"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <button
                          onClick={() => handleCategorySelect(item)}
                          disabled={isPending}
                          className={clsx(
                            "w-full flex items-center justify-between rounded-xl px-4 py-3 font-medium text-base transition-all duration-200 group",
                            isSelected
                              ? "bg-gradient-to-r from-green-100 to-yellow-50 text-green-700 shadow-md"
                              : "text-gray-600 hover:bg-gray-50 hover:text-green-600",
                            isPending && "opacity-50 cursor-wait"
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={clsx(
                                "rounded-full transition-all duration-200",
                                isSelected
                                  ? "w-3 h-3 bg-green-600"
                                  : "w-2 h-2 bg-gray-400"
                              )}
                            ></span>
                            {item.strCategory}
                          </span>
                          {isSelected && (
                            <svg
                              className="w-5 h-5 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <p className="text-xs text-center text-gray-500">
                  {categories.length} categories available
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <aside className="hidden sm:block sm:fixed sm:inset-y-0 sm:w-80 bg-white border-r border-gray-200 shadow-lg">
        <div className="flex flex-col h-full pt-20">
          {/* Header */}
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-green-100 to-yellow-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Categories</h2>
                <p className="text-sm text-gray-500">Browse our menu</p>
              </div>
            </div>

            {/* Search or filter (optional) */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full px-4 py-2 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg
                className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Categories List */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-2">
              {categories.map((item) => {
                const isSelected = selectedCategory?.id === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleCategorySelect(item)}
                      disabled={isPending}
                      className={clsx(
                        "w-full flex items-center justify-between rounded-xl px-4 py-3 font-medium text-base transition-all duration-200 group cursor-pointer",
                        isSelected
                          ? "bg-gradient-to-r from-green-100 to-yellow-50 text-green-700 shadow-md border border-green-200"
                          : "text-gray-600 hover:bg-gray-50 hover:text-green-600 hover:translate-x-1",
                        isPending && "opacity-50 cursor-wait"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={clsx(
                            "rounded-full transition-all duration-200",
                            isSelected
                              ? "bg-green-600 w-3 h-3"
                              : "bg-gray-400 w-2 h-2"
                          )}
                        ></span>
                        {item.strCategory}
                      </span>
                      {isSelected && (
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Footer Stats */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Total Categories</span>
              <span className="font-semibold text-gray-700">
                {categories.length}
              </span>
            </div>
            {selectedCategory && (
              <div className="mt-2 text-xs text-green-600">
                Currently viewing: {selectedCategory.strCategory}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-16 z-40 bg-white border-b border-gray-200 shadow-sm sm:hidden">
        <div className="px-4 py-3">
          <button
            onClick={() => setOpenCategoryListDialog(true)}
            className="w-full flex items-center justify-between rounded-xl bg-gradient-to-r from-green-50 to-yellow-50 px-4 py-3 text-base font-semibold text-gray-700 hover:from-green-100 hover:to-yellow-100 transition-all duration-200 shadow-sm"
          >
            <span className="flex items-center gap-2">
              <Bars3Icon className="w-5 h-5 text-green-600" />
              {selectedCategory
                ? selectedCategory.strCategory
                : "Select Category"}
            </span>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
