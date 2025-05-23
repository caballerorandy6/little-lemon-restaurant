import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

type Params = Promise<{ name: string; category: string }>;

export async function GET(
  request: NextRequest,
  segmentData: { params: Params }
) {
  const params = await segmentData.params;
  const name = params.name;
  const category = params.category;

  if (!category || !name) {
    return NextResponse.json(
      { error: "Category and name are required" },
      { status: 400 }
    );
  }

  try {
    const meal = await prisma.meal.findFirst({
      where: {
        strMeal: name,
        category: {
          strCategory: category,
        },
      },
      include: {
        category: true,
        reviews: {
          include: { user: true },
        },
      },
    });

    if (!meal) {
      return NextResponse.json(
        { error: `Not found meal with name: ${name} in category: ${category}` },
        { status: 404 }
      );
    }

    return NextResponse.json(meal);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
