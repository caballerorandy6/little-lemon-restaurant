import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("data", data);

    if (!Array.isArray(data.categories)) {
      return NextResponse.json({ error: "Invalid data format" });
    }

    return NextResponse.json(data.categories);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
