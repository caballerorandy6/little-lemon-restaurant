// /app/api/sync-all-meals/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { parseIngredients } from "@/libs/utils";
import { Meal } from "@/libs/types";

const validCategories = [
  "Beef",
  "Chicken",
  "Dessert",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
  "Breakfast",
  "Goat",
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
  try {
    // Obtener categorías desde la base de datos que coincidan con las válidas
    const categories = await prisma.category.findMany({
      where: {
        strCategory: { in: validCategories },
      },
    });

    for (const category of categories) {
      const categoryName = category.strCategory;

      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
          categoryName
        )}`
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.warn(
          `Failed to fetch meals for ${categoryName}. Status: ${res.status}, Message: ${errorText}`
        );
        continue;
      }

      const mealsData = await res.json();
      if (!mealsData.meals) {
        console.warn(`⚠️ No meals found for category: ${categoryName}`);
        continue;
      }

      // Obtener detalles completos secuencialmente para respetar el rate limit
      const detailedMeals: (Meal | null)[] = [];

      for (const m of mealsData.meals) {
        await delay(300); // pausa para no saturar la API

        const mealRes = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`
        );

        if (!mealRes.ok) {
          const detailError = await mealRes.text();
          console.warn(
            `Failed to fetch detail for meal ID ${m.idMeal}. Status: ${mealRes.status}, Message: ${detailError}`
          );

          // Si es error 429, espera 10 segundos extra para evitar bloqueos
          if (mealRes.status === 429) {
            console.warn(
              "Rate limit hit, waiting 10 seconds before continuing..."
            );
            await delay(10000);
          }

          detailedMeals.push(null);
          continue;
        }

        const detail = await mealRes.json();
        detailedMeals.push(detail.meals?.[0] ?? null);
      }

      // Insertar o actualizar cada meal en la base de datos
      const upserts = detailedMeals
        .filter((meal): meal is Meal => Boolean(meal))
        .map((meal) =>
          prisma.meal.upsert({
            where: { strMeal: meal.strMeal },
            update: {
              categoryId: category.id,
              createdAt: new Date(),
              updatedAt: new Date(),
              ingredients: parseIngredients(meal),
              strArea: meal.strArea,
              strInstructions: meal.strInstructions,
              strMealThumb: meal.strMealThumb,
              strTags: meal.strTags,
              strYoutube: meal.strYoutube,
            },
            create: {
              categoryId: category.id,
              createdAt: new Date(),
              updatedAt: new Date(),
              ingredients: parseIngredients(meal),
              strMeal: meal.strMeal,
              strArea: meal.strArea,
              strInstructions: meal.strInstructions,
              strMealThumb: meal.strMealThumb,
              strTags: meal.strTags,
              strYoutube: meal.strYoutube,
            },
          })
        );

      await Promise.all(upserts);

      // Espera 2 segundos antes de procesar la siguiente categoría para evitar saturar
      await delay(2000);
    }

    return NextResponse.json({
      message: "All valid meals synced successfully",
    });
  } catch (error) {
    console.error("Unexpected error during sync:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
