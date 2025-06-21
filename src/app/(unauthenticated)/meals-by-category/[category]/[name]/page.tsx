import { notFound } from "next/navigation";
import { Suspense } from "react";
import SingleMeal from "@/components/public/SingleMeal";
import { getSingleMeal, getCategories, getMealsByCategory } from "@/libs/utils";
import StoreHydration from "@/components/public/StoreHydration";
import { use } from "react";

// Tipado como Next.js 15 lo exige (parametros como Promise)
type Params = Promise<{ category: string; name: string }>;

export async function generateStaticParams() {
  const categories = await getCategories();
  const allMeals: { category: string; name: string }[] = [];

  for (const category of categories) {
    const meals = await getMealsByCategory(category.strCategory);
    meals.forEach((meal) => {
      allMeals.push({ category: category.strCategory, name: meal.strMeal });
    });
  }

  return allMeals.map(({ category, name }) => ({ category, name }));
}

export default function MealPage({ params }: { params: Params }) {
  const { category, name } = use(params);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const decodedName = decodeURIComponent(name);

  const meal = use(getSingleMeal(category, decodedName, baseUrl));

  if (!meal) {
    notFound();
  }

  // No necesitas pasar el meal directamente como prop,
  // ya lo usas dentro de Zustand con StoreHydration
  return (
    <Suspense fallback={<div className="mt-20 text-center">Loading...</div>}>
      <StoreHydration
        singleMealPromise={Promise.resolve(meal)}
        categoriesPromise={getCategories()}
        mealsByCategoryPromise={getMealsByCategory(category)}
      />
      <SingleMeal />
    </Suspense>
  );
}
