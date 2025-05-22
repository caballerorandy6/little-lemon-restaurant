import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Category } from "@/libs/types";

export async function GET() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    if (!response.ok)
      throw new Error("Failed to fetch categories from TheMealDB");

    const data = await response.json();

    if (!data.categories) {
      return NextResponse.json(
        { error: "No categories found" },
        { status: 404 }
      );
    }

    const categories = data.categories;

    const upsertCategories = categories.map((category: Category) =>
      prisma.category.upsert({
        where: { strCategory: category.strCategory },
        update: {
          description: category.strCategoryDescription,
          thumb: category.strCategoryThumb,
        },
        create: {
          strCategory: category.strCategory,
          description: category.strCategoryDescription,
          thumb: category.strCategoryThumb,
        },
      })
    );

    await Promise.all(upsertCategories);

    return NextResponse.json({
      message: "Categories synchronized successfully",
    });
  } catch (error) {
    console.error("Error synchronizing categories:", error);
    return NextResponse.json(
      { error: "Failed to synchronize categories" },
      { status: 500 }
    );
  }
}
