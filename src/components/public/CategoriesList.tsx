"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useLittleLemonStore } from "@/store/little-lemon-store";

import clsx from "clsx";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { MealAPI } from "@/libs/types";
import CategoriesLisSkeleton from "./CategoriesListSkeleton";

export default function CategoriesList() {
  const {
    categories,
    fetchCategories,
    items,
    fetchMealsByCategory,
    selectedCategory,
    setSelectedCategory,
    openCategoryListDialog,
    setOpenCategoryListDialog,
  } = useLittleLemonStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory, setSelectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      fetchMealsByCategory(selectedCategory.strCategory);
    }
  }, [selectedCategory, fetchMealsByCategory]);

  return (
    <div>
      {/* Mobile sidebar */}
      <Dialog
        open={openCategoryListDialog}
        onClose={setOpenCategoryListDialog}
        className="relative z-50 sm:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0" />

        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setOpenCategoryListDialog(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
              <div className="flex h-16 shrink-0 items-center">
                <Image
                  className="h-20 w-auto mt-10"
                  priority
                  src="/logo/logo6.webp"
                  alt="Little Lemon Logo"
                  width={100}
                  height={100}
                />
              </div>
              <nav className="flex flex-1 flex-col pt-10">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul
                      role="list"
                      className="-mx-2 space-y-1 overflow-y-scroll"
                    >
                      {categories.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              setSelectedCategory(item);
                              setOpenCategoryListDialog(false);
                            }}
                            className={clsx(
                              selectedCategory?.id === item.id
                                ? "bg-gray-100 text-blue-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6"
                            )}
                          >
                            {item.strCategory}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div
        className="hidden sm:fixed sm:inset-y-0 sm:z-50 sm:flex sm:w-72 sm:flex-col border-r border-gray-200 bg-white"
        style={{ top: "64px" }}
      >
        <div className="flex flex-col gap-y-5 overflow-y-auto px-6 py-4">
          <nav className="flex flex-1 flex-col pt-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {categories.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setSelectedCategory(item)}
                        className={clsx(
                          selectedCategory?.id === item.id
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6"
                        )}
                      >
                        {item.strCategory}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile top navbar */}
      <div className="sticky top-0 z-40 flex justify-center bg-white px-4 py-2 shadow-xs sm:hidden">
        <button
          type="button"
          onClick={() => setOpenCategoryListDialog(true)}
          className="p-2.5 text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:outline-none rounded-md cursor-pointer transition-colors"
        >
          View Categories
        </button>
      </div>

      {/* Main content */}
      <main className="sm:pl-72">
        <div className="sm:px-6 lg:px-8">
          {!selectedCategory || items.length === 0 ? (
            <CategoriesLisSkeleton />
          ) : (
            <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  {selectedCategory.strCategory} Menu
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {items
                    .filter(
                      (item) =>
                        item.category?.strCategory ===
                        selectedCategory.strCategory
                    )
                    .map((itemMeal: MealAPI) => (
                      <div
                        key={itemMeal.id}
                        className="relative group rounded-lg overflow-hidden shadow-lg"
                      >
                        <Image
                          priority
                          width={500}
                          height={500}
                          src={itemMeal.strMealThumb}
                          alt={itemMeal.strMeal}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Link
                            href={`/meals-by-category/${encodeURIComponent(
                              itemMeal.category?.strCategory ??
                                selectedCategory.strCategory
                            )}/${itemMeal.strMeal}`}
                            className="rounded-md bg-white/80 px-4 py-2 text-sm font-medium text-gray-900 backdrop-blur-sm backdrop-filter hover:bg-white transition-colors cursor-pointer"
                          >
                            View Details
                          </Link>
                        </div>
                        <h3 className="mt-2 text-sm text-gray-900 text-center mb-4">
                          {itemMeal.strMeal}
                        </h3>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
