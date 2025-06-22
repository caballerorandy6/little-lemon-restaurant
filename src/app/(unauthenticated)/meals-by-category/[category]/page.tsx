// app/meals-by-category/[category]/page.tsx
import { use } from "react";
import { getCategories, getMealsByCategory } from "@/libs/utils";
import MealsByCategoryList from "@/components/public/MealsByCategoryList";
import { notFound } from "next/navigation";

type Params = Promise<{ category: string }>;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories?.map((category) => ({
    category: category.strCategory,
  }));
}

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const category = params.category;
  return {
    title: `Meals in ${category}`,
    description: `Explore delicious meals in the ${category} category.`,
  };
}

export default function MealsByCategoryPage({ params }: { params: Params }) {
  const { category } = use(params);

  if (!category) {
    notFound();
  }

  const meals = use(getMealsByCategory(category));

  if (!meals || meals.length === 0) {
    notFound();
  }

  return <MealsByCategoryList />;
}
