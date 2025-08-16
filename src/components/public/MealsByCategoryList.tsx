"use client";

import Image from "next/image";
import Link from "next/link";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import CategoriesLisSkeleton from "../skeletons/CategoriesListSkeleton";
import { toast } from "sonner";
import { useCategoryStore } from "@/store/category-store";

const MealsByCategoryList = () => {
  const { isLoading, addToCart } = useLittleLemonStore();

  const { selectedCategory, mealsByCategory } = useCategoryStore();

  const meals = mealsByCategory.filter(
    (item) => item.category?.strCategory === selectedCategory?.strCategory
  );

  if (!selectedCategory || isLoading || meals.length === 0) {
    return <CategoriesLisSkeleton />;
  }

  return (
    <section
      id="meals-by-category"
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      <div className="w-full sm:pl-24">
        <div className="mx-auto px-6 lg:px-10 xl:px-12 py-8 sm:py-12 max-w-full">
          {/* Header Section */}
          <div className="mb-10 text-center sm:text-left animate-fadeIn">
            <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
              {meals.length} {meals.length === 1 ? "Dish" : "Dishes"} Available
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {selectedCategory?.strCategory}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500">
                Menu
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Explore our delicious selection of{" "}
              {selectedCategory?.strCategory.toLowerCase()} dishes, crafted with
              the finest ingredients and authentic recipes.
            </p>

            {/* Decorative line */}
            <div className="flex items-center gap-4 mt-6 justify-center sm:justify-start">
              <div className="h-1 w-16 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full"></div>
              <div className="h-1 w-12 bg-gradient-to-r from-yellow-500 to-green-400 rounded-full"></div>
              <div className="h-1 w-8 bg-green-400 rounded-full"></div>
            </div>
          </div>

          {/* Meals Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {meals.map((meal, index) => (
              <div
                key={meal.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-md text-gray-800 shadow-md">
                    {selectedCategory?.strCategory}
                  </span>
                </div>

                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Image
                    priority
                    width={500}
                    height={500}
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* View Details Button - Centered */}
                  {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Link
                      href={`/meals-by-category/${encodeURIComponent(
                        meal.category.strCategory
                      )}/${meal.strMeal}`}
                      className="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg hover:bg-green-50 hover:text-green-700 transition-all duration-200">
                        View Details
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                    {meal.strMeal}
                  </h3>

                  {/* Price or additional info (if available) */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">Popular</span>
                  </div>

                  {/* Quick action buttons */}
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/meals-by-category/${encodeURIComponent(
                        meal.category.strCategory
                      )}/${meal.strMeal}`}
                      className="flex-1 px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      Quick View
                    </Link>
                    <button
                      className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => {
                        addToCart({
                          item: meal,
                          quantity: 1,
                          image: meal.strMealThumb || "",
                        });
                        toast.success("Item added to cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-green-400 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Empty state (if needed) */}
          {meals.length === 0 && (
            <div className="text-center py-20 col-span-full">
              <svg
                className="mx-auto h-16 w-16 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No dishes available
              </h3>
              <p className="text-gray-500">
                Please select another category to explore more options.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MealsByCategoryList;
