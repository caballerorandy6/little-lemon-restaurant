"use client";

import { useEffect } from "react";
import CategoryModal from "@/components/public/CategoryModal";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import clsx from "clsx";

export default function SideBarCategories() {
  const { categories, fetchCategories, selectedCategory, setSelectedCategory } =
    useLittleLemonStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div className="flex h-16 shrink-0 items-center">
        <h1>Categories</h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-1">
              {categories.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setSelectedCategory(item)}
                    className={clsx(
                      item.id ? "bg-gray-50" : "hover:bg-gray-50",
                      "block rounded-md py-2 pr-2 pl-10 text-sm/6 text-gray-700"
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
      {selectedCategory && (
        <CategoryModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
}
