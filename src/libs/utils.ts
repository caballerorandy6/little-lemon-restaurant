import { Meal, Ingredient } from "@/libs/types";

export const userNameSimulation = (user: string) => {
  const fullName = user;
  const initials = fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=4ade80&fontColor=ffffff`;
  return avatarUrl;
};

export function parseIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;

    const ingredient = meal[ingredientKey];
    const measure = meal[measureKey];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
  }

  return ingredients;
}
