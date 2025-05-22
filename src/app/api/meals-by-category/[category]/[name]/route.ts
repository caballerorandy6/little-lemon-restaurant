import { NextRequest, NextResponse } from "next/server";

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
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        name
      )}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }

    const data = await response.json();

    if (!Array.isArray(data.meals) || data.meals.length === 0) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 });
    }

    return NextResponse.json(data.meals[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
