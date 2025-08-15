"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CategoryAPI } from "@/libs/types";
import Image from "next/image";
import Link from "next/link";
import { useLittleLemonStore } from "@/store/little-lemon-store";

interface CategoryModalProps {
  category: CategoryAPI;
  onClose: () => void;
}

const CategoryModal = ({ category, onClose }: CategoryModalProps) => {
  const { setCategoryModalDialog } = useLittleLemonStore();

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl transform transition-all duration-300 animate-modalSlideIn">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-green-50 via-yellow-50 to-green-50 rounded-t-2xl opacity-50"></div>

            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-500 hover:text-gray-700 hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 cursor-pointer"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="relative p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-gray-800 shadow-md">
                      Premium Selection
                    </span>
                  </div>

                  <div className="relative overflow-hidden rounded-xl group">
                    <Image
                      priority={false}
                      width={500}
                      height={500}
                      src={category.thumb}
                      alt={category.strCategory}
                      className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/meals-by-category/${category.strCategory}`}
                      onClick={() => {
                        setCategoryModalDialog(false);
                        onClose();
                      }}
                      className="group relative w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-green-600 hover:to-green-500"
                    >
                      <span>Explore Full {category.strCategory} Menu</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>

                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                      CATEGORY SPOTLIGHT
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                    {category.strCategory}
                  </h2>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-1 w-12 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full"></div>
                    <div className="h-1 w-8 bg-gradient-to-r from-yellow-500 to-green-400 rounded-full"></div>
                    <div className="h-1 w-4 bg-green-400 rounded-full"></div>
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {category.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs font-semibold text-green-700 uppercase">
                          Quality
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Premium Ingredients
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center gap-2 mb-1">
                        <svg
                          className="w-4 h-4 text-yellow-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-semibold text-yellow-700 uppercase">
                          Popular
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Guest Favorite</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CategoryModal;
