import Image from "next/image";
import Link from "next/link";
import { MealAPI } from "@/libs/types";

type MealsByCategoryListProps = {
  category: string;
  meals: MealAPI[];
};

const MealsByCategoryList = ({ category, meals }: MealsByCategoryListProps) => {
  return (
    <div className="bg-white mt-20">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          {category} Menu
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="relative group rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl"
            >
              <Image
                priority
                width={500}
                height={500}
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-64 object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
                <Link
                  href={`/meals-by-category/${encodeURIComponent(
                    meal.category.strCategory
                  )}/${meal.strMeal}`}
                  className="rounded-lg bg-white/90 px-5 py-2 text-sm font-semibold text-gray-900 backdrop-blur-md hover:bg-white transition-all cursor-pointer"
                >
                  View Details
                </Link>
              </div>

              <h3 className="mt-4 mb-2 text-center text-lg font-medium text-gray-800">
                {meal.strMeal}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealsByCategoryList;
