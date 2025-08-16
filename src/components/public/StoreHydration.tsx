"use client";

import { use, useEffect, useRef } from "react";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { useReservationStore } from "@/store/reservation-store";
import { useReviewStore } from "@/store/review-store";
import { useCategoryStore } from "@/store/category-store";
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
  userReservationsPromise: Promise<ReservationAPI[]>;
  userReviewsPromise: Promise<Review[]>;
};

export default function StoreHydration({
  categoriesPromise,
  mealsByCategoryPromise,
  singleMealPromise,
  currentUser,
  userReservationsPromise,
  userReviewsPromise,
}: Props) {
  // Usar `use()` para resolver las promesas - esto suspenderá el componente
  const categories = use(categoriesPromise);
  const allMealsByCategory = use(mealsByCategoryPromise);
  const singleMeal = use(singleMealPromise);
  const userReservations = use(userReservationsPromise);
  const reviews = use(userReviewsPromise);

  // Obtener funciones del store
  const { setSingleMeal, selectedCategory, setUser } = useLittleLemonStore();
  const { setMealsByCategory, setCategories, setSelectedCategory } =
    useCategoryStore();
  const { setUserReservations } = useReservationStore();
  const { setReviews } = useReviewStore();

  // Usar useRef para evitar múltiples ejecuciones
  const hasHydrated = useRef(false);

  // Un solo useEffect para hidratar todo
  useEffect(() => {
    if (!hasHydrated.current) {
      // Hidratar stores - SOLO una vez al montar
      setCategories(categories);
      setMealsByCategory(allMealsByCategory);
      setSingleMeal(singleMeal);
      setUser(currentUser);
      setUserReservations(userReservations);
      setReviews(reviews);

      if (categories.length > 0 && !selectedCategory) {
        setSelectedCategory(categories[0]);
      }

      hasHydrated.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intencionalmente vacío - solo ejecutar al montar

  return null;
}
