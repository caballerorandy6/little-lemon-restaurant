"use client";

import { useTransition } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";

export default function SidebarCategories() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    openCategoryListDialog,
    setOpenCategoryListDialog,
  } = useLittleLemonStore();

  const [, startTransition] = useTransition();

  // const handleSelect = (item: (typeof categories)[number]) => {
  //   startTransition(() => {
  //     setSelectedCategory(item);
  //   });
  //   setOpenCategoryListDialog(false);
  // };

  return (
    <>
      {/* Mobile sidebar */}
      <Dialog
        open={openCategoryListDialog}
        onClose={setOpenCategoryListDialog}
        className="relative z-50 sm:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative flex w-full max-w-xs bg-white p-6 rounded-r-2xl">
            <TransitionChild>
              <button
                type="button"
                onClick={() => setOpenCategoryListDialog(false)}
                className="absolute right-2 top-2 p-2"
              >
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              </button>
            </TransitionChild>
            <div className="w-full">
              <Image
                className="mb-6 h-16 w-auto"
                src="/logo/logo6.webp"
                alt="Little Lemon Logo"
                width={100}
                height={100}
              />
              <ul className="space-y-4">
                {categories.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() =>
                        startTransition(() => setSelectedCategory(item))
                      }
                      className={clsx(
                        selectedCategory?.id === item.id
                          ? "bg-green-100 text-green-700"
                          : "text-gray-500 hover:bg-green-100 hover:text-green-700",
                        "w-full text-left rounded-md px-4 py-1 font-medium text-base transition-colors cursor-pointer"
                      )}
                    >
                      {item.strCategory}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <aside className="hidden sm:fixed sm:inset-y-0 sm:w-72 sm:flex flex-col border-r border-gray-200 bg-white pt-24 px-6">
        <ul className="space-y-3">
          {categories.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => startTransition(() => setSelectedCategory(item))}
                className={clsx(
                  selectedCategory?.id === item.id
                    ? "bg-green-100 text-green-700"
                    : "text-gray-500 hover:bg-green-100 hover:text-green-700",
                  "w-full text-left rounded-md px-4 py-1 font-medium text-base transition-colors cursor-pointer"
                )}
              >
                {item.strCategory}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile top button */}
      <div className="fixed inset-x-0 top-16 z-40 bg-white p-4 sm:hidden justify-center items-centerf flex">
        <button
          onClick={() => setOpenCategoryListDialog(true)}
          className="rounded-lg bg-yellow-100 px-4 py-2 hover:bg-green-100 text-gray-500 cursor-pointer hover:text-green-700 transition-colors text-base font-medium"
        >
          View Categories
        </button>
      </div>
    </>
  );
}
