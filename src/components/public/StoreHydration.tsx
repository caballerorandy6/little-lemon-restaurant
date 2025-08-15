"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { useReservationStore } from "@/store/reservation-store";
import { useReviewStore } from "@/store/review-store";
import type {
  CategoryAPI,
  MealAPI,
  SafeUser,
  ReservationAPI,
  Review,
} from "@/libs/types";

type Props = {
  categoriesPromise: Promise<CategoryAPI[]>;
  mealsByCategoryPromise: Promise<MealAPI[]>;
  singleMealPromise: Promise<MealAPI | null>;
  currentUser: SafeUser | null;
  // cartFromDBPromise: Promise<CartItem[]>;
  userReservationsPromise: Promise<ReservationAPI[]>;
  userReviewsPromise: Promise<Review[]>;
};

export default function StoreHydration({
  categoriesPromise,
  mealsByCategoryPromise,
  singleMealPromise,
  currentUser,
  // cartFromDBPromise,
  userReservationsPromise,
  userReviewsPromise,
}: Props) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Usando `use()` para resolver todas las promesas
  const categories = use(categoriesPromise);
  const allMealsByCategory = use(mealsByCategoryPromise);
  const singleMeal = use(singleMealPromise);
  const user = currentUser;
  const userReservations = use(userReservationsPromise);
  const reviews = use(userReviewsPromise);

  const {
    setCategories,
    setSelectedCategory,
    setSingleMeal,
    selectedCategory,
    setMealsByCategory,
    setUser,
    // setCart,
  } = useLittleLemonStore();

  const { setUserReservations, setIsHydrated: setIsReservationHydrated } =
    useReservationStore();
  const { setReviews } = useReviewStore();

  // Efecto para establecer los valores en el store
  useEffect(() => {
    setCategories(categories);
    setMealsByCategory(allMealsByCategory);
    setSingleMeal(singleMeal);
    setUser(user);
    setUserReservations(userReservations);
    setReviews(reviews);
    setIsHydrated(true);
    setIsReservationHydrated(true);
    setUserReservations(userReservations);
  }, [
    categories,
    setCategories,
    allMealsByCategory,
    setMealsByCategory,
    singleMeal,
    setSingleMeal,
    user,
    setUser,
    userReservations,
    setUserReservations,
    setReviews,
    reviews,
    setIsHydrated,
    isHydrated,
    setIsReservationHydrated,
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
