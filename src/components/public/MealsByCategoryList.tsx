"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import Image from "next/image";
import Link from "next/link";

const MealsByCategoryList = () => {
  const { items, fetchMealsByCategory } = useLittleLemonStore();
  const params = useParams();

  console.log("items", items);

  useEffect(() => {
    if (typeof params.category === "string") {
      fetchMealsByCategory(params.category);
    }
  }, [params.category, fetchMealsByCategory]);

  return (
    <div className="bg-white mt-20">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          {params.category} Menu
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                priority
                width={500}
                height={500}
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-full h-64 object-cover"
              />

              {/* Botón que aparece al hacer hover */}
              <div className="absolute inset-0 flex items-center justify-center mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  href={`/meals-by-category/${encodeURIComponent(
                    item.category.strCategory
                  )}/${item.strMeal}`}
                  className="rounded-md bg-white/80 px-4 py-2 text-sm font-medium text-gray-900 backdrop-blur-sm backdrop-filter hover:bg-white transition-colors cursor-pointer"
                >
                  View Details
                </Link>
              </div>

              {/* Título debajo de la imagen */}
              <h3 className="mt-2 text-sm text-gray-900 text-center mb-4">
                {item.strMeal}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealsByCategoryList;
