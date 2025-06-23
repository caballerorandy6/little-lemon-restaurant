import { use } from "react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SingleMeal from "@/components/public/SingleMeal";
import StoreHydration from "@/components/public/StoreHydration";
import SingleMealSkeleton from "@/components/skeletons/SingleMealSkeleton";
import { getSingleMeal, getCategories, getMealsByCategory } from "@/libs/utils";
import { getCurrentUser } from "@/libs/auth/getCurrentUser";
import { getCartServerSide } from "@/libs/server";

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
    <Suspense fallback={<SingleMealSkeleton />}>
      <StoreHydration
        singleMealPromise={Promise.resolve(meal)}
        categoriesPromise={getCategories()}
        mealsByCategoryPromise={getMealsByCategory(category)}
        currentUser={use(getCurrentUser())}
        cartFromDBPromise={getCartServerSide()}
      />
      <SingleMeal />
    </Suspense>
  );
}
