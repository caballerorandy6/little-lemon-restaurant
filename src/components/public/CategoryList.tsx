"use client";

import { useEffect } from "react";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import Image from "next/image";

const CategoryList = () => {
  const { fetchCategories, categories } = useLittleLemonStore();

  console.log("categories", categories);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto"
    >
      {categories?.map((cat, index) => (
        <li
          key={index}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-sm h-20 w-auto"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <p className="truncate text-sm font-medium text-gray-900">
                  {cat.strCategory}
                </p>
              </div>
            </div>
            {cat.strCategoryThumb ? (
              <Image
                width={1000}
                height={1000}
                priority={false}
                alt={cat.strCategory}
                src={cat.strCategoryThumb}
                className="size-12 shrink-0 rounded-full bg-gray-300"
              />
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
