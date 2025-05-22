"use client";

import { useEffect } from "react";
import Image from "next/image";
import CategoryModal from "@/components/public/CategoryModal";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import useSectionObserver from "@/libs/hooks/useSectionObserver";

export default function ProductGrid() {
  const { categories, fetchCategories, selectedCategory, setSelectedCategory } =
    useLittleLemonStore();
  console.log("categories", categories);

  const ref = useSectionObserver({ sectionName: "Menu" });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section
      id="menu"
      ref={ref}
      className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8"
    >
      <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl mb-16">
        Our Menu
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative group rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              priority
              width={500}
              height={500}
              src={category.thumb}
              alt={category.strCategory}
              className="w-full h-64 object-cover"
            />

            {/* Botón que aparece al hacer hover */}
            <div className="absolute inset-0 flex items-center justify-center mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => setSelectedCategory(category)}
                className="rounded-md bg-white/80 px-4 py-2 text-sm font-medium text-gray-900 backdrop-blur-sm backdrop-filter hover:bg-white transition-colors cursor-pointer"
              >
                View Product
              </button>
            </div>

            {/* Título debajo de la imagen */}
            <h3 className="mt-2 text-sm text-gray-900 text-center mb-4">
              {category.strCategory}
            </h3>
          </div>
        ))}

        {selectedCategory && (
          <CategoryModal
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
          />
        )}
      </div>
    </section>
  );
}
