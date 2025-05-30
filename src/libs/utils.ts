import { Meal, Ingredient } from "@/libs/types";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { CartItem, CategoryAPI, MealAPI } from "@/libs/types";

// ✅ Mover esto dentro de una función
export const getCart = () => useLittleLemonStore.getState().cart;

export const quantityItemCart = (itemId: number) => {
  const cart = getCart();
  const item = cart.find((item: CartItem) => item.item.id === itemId);
  return item ? item.quantity : 0;
};

export const subTotal = () => {
  const cart = getCart();
  return cart
    .reduce((acc, product) => acc + product.item.price * product.quantity, 0)
    .toFixed(2);
};

export const taxCalculation = () => (Number(subTotal()) * 0.075).toFixed(2);
export const shippingCalculation = () => (Number(subTotal()) * 0.05).toFixed(2);

export const totalCalculation = () =>
  (
    Number(subTotal()) +
    Number(taxCalculation()) +
    Number(shippingCalculation())
  ).toFixed(2);

// Avatar simulation
export const userNameSimulation = (user: string) => {
  const fullName = user;
  const initials = fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=4ade80&fontColor=ffffff`;
};

// Ingredient parsing
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

// getCategories function to fetch categories from the API
export async function getCategories(): Promise<CategoryAPI[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

//getMealsByCategory function to fetch meals by category from the API
export async function getMealsByCategory(category: string): Promise<MealAPI[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/meals-by-category/${category}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meals by category");
    }
    const data = await response.json();
    return data.map((meal: MealAPI) => ({
      ...meal,
      price: meal.price ?? 10, // Default price if not provided
    }));
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    return [];
  }
}

// getSingleMeal function to fetch a single meal by category and name from the API
export async function getSingleMeal(
  category: string,
  name: string
): Promise<MealAPI | null> {
  try {
    const response = await fetch(
      `/api/meals-by-category/${category}/${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meal");
    }

    const meal = await response.json();
    const mealWithPrice: MealAPI = {
      ...meal,
      price: meal.price ?? 10, // Default price if not provided
    };

    return mealWithPrice;
  } catch (error) {
    console.error("Error fetching single meal:", error);
    return null;
  }
}
