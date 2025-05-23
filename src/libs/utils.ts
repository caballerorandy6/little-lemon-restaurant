import { Meal, Ingredient } from "@/libs/types";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { CartItem } from "@/libs/types";

const cart = useLittleLemonStore.getState().cart;

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

// This function parses the ingredients from a meal object
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

// This function returns the quantity of a specific item in the cart
export const quantityItemCart = (itemId: number) => {
  const item = cart.find((item: CartItem) => item.item.id === itemId);
  return item ? item.quantity : 0;
};

// This function returns the total price of the cart
export const calculateTotalPrice = (cart: CartItem[]) => {
  return cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.item.price.toFixed(2));
    const itemQuantity = item.quantity;

    return total + itemPrice * itemQuantity;
  }, 0);
};

//Subtotal calculation
export const subTotal = cart
  .reduce((acc, product) => {
    return acc + product.item.price * product.quantity;
  }, 0)
  .toFixed(2);

//Tax calculation
export const taxCalculation = (Number(subTotal) * 0.075).toFixed(2);

//Shipping calculation
export const shippingCalculation = (Number(subTotal) * 0.05).toFixed(2);

//Total calculation
export const totalCalculation = (
  Number(subTotal) +
  Number(taxCalculation) +
  Number(shippingCalculation)
).toFixed(2);
