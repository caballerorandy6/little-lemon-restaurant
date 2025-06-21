"use client";

import { use } from "react";
import { useEffect } from "react";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import type { CategoryAPI, MealAPI } from "@/libs/types";

type Props = {
  categoriesPromise: Promise<CategoryAPI[]>;
  mealsByCategoryPromise: Promise<MealAPI[]>;
  singleMealPromise: Promise<MealAPI | null>;

  // puedes agregar más props como settingsPromise, userPromise, etc.
};

export default function StoreHydration({
  categoriesPromise,
  mealsByCategoryPromise,
  singleMealPromise,
}: Props) {
  const categories = use(categoriesPromise);
  const allMealsByCategory = use(mealsByCategoryPromise);
  const singleMeal = use(singleMealPromise) as MealAPI | null;

  const {
    setCategories,
    setSelectedCategory,
    selectedCategory,
    setMealsByCategory,
    setSingleMeal,
  } = useLittleLemonStore();

  useEffect(() => {
    setCategories(categories);
    setMealsByCategory(allMealsByCategory);
    setSingleMeal(singleMeal);
    console.log(singleMeal, "Single meal set in store");
  }, [
    categories,
    setCategories,
    allMealsByCategory,
    setMealsByCategory,
    setSingleMeal,
    singleMeal,
  ]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory, setSelectedCategory]);

  return null;
}
