"use client";

import { use } from "react";
import { useEffect } from "react";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import type { CategoryAPI, MealAPI, SafeUser } from "@/libs/types";

type Props = {
  categoriesPromise: Promise<CategoryAPI[]>;
  mealsByCategoryPromise: Promise<MealAPI[]>;
  singleMealPromise: Promise<MealAPI | null>;
  currentUser: SafeUser | null;
  // cartFromDBPromise: Promise<CartItem[]>;
};

export default function StoreHydration({
  categoriesPromise,
  mealsByCategoryPromise,
  singleMealPromise,
  currentUser,
  // cartFromDBPromise,
}: Props) {
  // Usando `use()` para resolver todas las promesas
  const categories = use(categoriesPromise);
  const allMealsByCategory = use(mealsByCategoryPromise);
  const singleMeal = use(singleMealPromise);
  const user = currentUser;
  // const cartFromDB = use(cartFromDBPromise);

  const {
    setCategories,
    setSelectedCategory,
    selectedCategory,
    setMealsByCategory,
    setSingleMeal,
    setUser,
    // setCart,
  } = useLittleLemonStore();

  // Efecto para establecer los valores en el store
  useEffect(() => {
    setCategories(categories);
    setMealsByCategory(allMealsByCategory);
    setSingleMeal(singleMeal);
    setUser(user);
    // setCart(cartFromDB);
  }, [
    categories,
    setCategories,
    allMealsByCategory,
    setMealsByCategory,
    singleMeal,
    setSingleMeal,
    user,
    setUser,
    // cartFromDB,
    // setCart,
  ]);

  // Efecto para recuperar el carrito del almacenamiento local
  // useEffect(() => {
  //   const cart = getCart();
  //   if (cart) setCart(cart);
  // }, [setCart]);

  // Efecto para establecer la categoría seleccionada si no está definida
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory, setSelectedCategory]);

  // Efecto para establecer el carrito desde la base de datos si está disponible
  // useEffect(() => {
  //   if (Array.isArray(cartFromDB) && cartFromDB.length > 0) {
  //     setCart(cartFromDB);
  //   }
  // }, [cartFromDB, setCart]);

  return null;
}
