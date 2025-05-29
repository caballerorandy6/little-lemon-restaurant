// app/meals-by-category/[category]/page.tsx
import { use } from "react";
import { getCategories, getMealsByCategory } from "@/libs/prisma";
import MealsByCategoryList from "@/components/public/MealsByCategoryList";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories?.map((category) => ({
    category: category.strCategory,
  }));
}

type Params = Promise<{ category: string }>;

export default function Page({ params }: { params: Params }) {
  const { category } = use(params);
  const meals = use(getMealsByCategory(category));

  if (!meals || meals.length === 0) {
    notFound();
  }

  return <MealsByCategoryList category={category} meals={meals} />;
}
