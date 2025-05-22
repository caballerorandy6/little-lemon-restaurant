import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

type Params = {
  category: string;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const { category } = await params;

  try {
    const categoryData = await prisma.category.findUnique({
      where: {
        strCategory: category,
      },
    });

    if (!categoryData) {
      return NextResponse.json(
        { error: `Category not found: ${category}` },
        { status: 404 }
      );
    }

    const meals = await prisma.meal.findMany({
      where: { categoryId: categoryData.id },
      include: {
        category: true,
        reviews: {
          include: { user: true },
        },
      },
    });

    if (!meals || meals.length === 0) {
      return NextResponse.json(
        { error: `No meals found for category: ${category}` },
        { status: 404 }
      );
    }

    return NextResponse.json(meals);
  } catch (error) {
    console.log("Error fetching meals by category:", error);
    return NextResponse.json(
      { error: "Failed to fetch meals by category" },
      { status: 500 }
    );
  }
}
