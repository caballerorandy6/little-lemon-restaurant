"use client";

import { useTransition } from "react";
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
import CategoriesLisSkeleton from "../skeletons/CategoriesListSkeleton";

export default function CategoriesList() {
  const {
    categories,
    items,
    selectedCategory,
    setSelectedCategory,
    openCategoryListDialog,
    setOpenCategoryListDialog,
    isLoading,
    mealsByCategory,
  } = useLittleLemonStore();

  console.log("Meals by category:", mealsByCategory);

  const [isPending, startTransition] = useTransition();

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
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full bg-white rounded-r-3xl shadow-lg">
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setOpenCategoryListDialog(false)}
                  className="-m-2.5 p-2.5"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-700" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 py-8">
              <div className="flex h-16 shrink-0 items-center">
                <Image
                  className="h-20 w-auto"
                  priority
                  src="/logo/logo6.webp"
                  alt="Little Lemon Logo"
                  width={100}
                  height={100}
                />
              </div>
              <nav className="flex flex-1 flex-col pt-6">
                <ul className="flex flex-1 flex-col gap-y-6 overflow-y-auto">
                  {categories.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setOpenCategoryListDialog(false);
                          startTransition(() => {
                            setSelectedCategory(item);
                          });
                        }}
                        className={clsx(
                          selectedCategory?.id === item.id
                            ? "bg-yellow-100 text-yellow-700"
                            : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-700",
                          "group flex gap-x-3 rounded-xl p-3 text-base font-semibold transition-colors"
                        )}
                      >
                        {item.strCategory}
                      </button>
                    </li>
                  ))}
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
        <div className="flex flex-col gap-y-5 overflow-y-auto px-6 py-8">
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col overflow-y-scroll">
              {categories.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      startTransition(() => {
                        setSelectedCategory(item);
                      });
                    }}
                    className={clsx(
                      selectedCategory?.id === item.id
                        ? "bg-green-100 text-green-700"
                        : "text-gray-500 hover:bg-green-100 hover:text-green-700",
                      "group flex gap-x-3 rounded-xl p-3 text-base transition-colors w-full cursor-pointer"
                    )}
                  >
                    {item.strCategory}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile top navbar */}
      <div className="sticky top-0 z-40 flex justify-center bg-white px-6 py-4 shadow-md border-b border-gray-200 sm:hidden">
        <button
          type="button"
          onClick={() => setOpenCategoryListDialog(true)}
          className="p-2.5 text-yellow-700 hover:bg-yellow-100 focus:outline-none rounded-lg cursor-pointer transition-colors font-semibold"
        >
          View Categories
        </button>
      </div>

      {/* Main content */}
      <main className="sm:pl-72">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          {!selectedCategory ||
          isLoading ||
          isPending ||
          !items.some(
            (i) => i.category?.strCategory === selectedCategory.strCategory
          ) ? (
            <CategoriesLisSkeleton />
          ) : (
            <>
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-16 sm:text-5xl">
                {selectedCategory.strCategory} Menu
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {items
                  .filter(
                    (item) =>
                      item.category?.strCategory ===
                      selectedCategory.strCategory
                  )
                  .map((itemMeal: MealAPI) => (
                    <div
                      key={itemMeal.id}
                      className="relative group rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl"
                    >
                      <Image
                        priority
                        width={500}
                        height={500}
                        src={itemMeal.strMealThumb}
                        alt={itemMeal.category.strCategory}
                        className="w-full h-64 object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
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

                      <h3 className="mt-4 mb-2 text-center text-lg font-medium text-gray-800">
                        {itemMeal.strMeal}
                      </h3>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
