"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CategoryAPI } from "@/libs/types";
import Image from "next/image";
import Link from "next/link";

interface CategoryModalProps {
  category: CategoryAPI;
  onClose: () => void;
}

const CategoryModal = ({ category, onClose }: CategoryModalProps) => {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-1">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 z-30 w-screen overflow-y-auto mt-20">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel className="relative bg-white w-full max-w-3xl mx-auto my-8 rounded-lg p-6 shadow-lg max-h-[80vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div>
                <Image
                  priority={false}
                  width={500}
                  height={500}
                  src={category.thumb}
                  alt={category.strCategory}
                  className="w-full h-auto rounded-lg object-cover"
                />
                <p className="text-center sm:text-left flex items-center justify-center mt-10">
                  <Link
                    href={`/meals-by-category/${category.strCategory}`}
                    onClick={onClose}
                    className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
                  >
                    See the {category.strCategory} Menu
                  </Link>
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.strCategory}
                </h2>
                <p className="mt-2 text-lg font-medium text-gray-700">
                  {category.description}
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CategoryModal;
