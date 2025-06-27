import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/libs/prisma";
import { reviewSchema } from "@/libs/zod";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = jwt.verify(token.value, process.env.JWT_SECRET!) as {
      id: number;
    };

    const body = await request.json();

    const parsed = reviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: parsed.error.errors },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        ...parsed.data,
        userId: payload.id,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error adding reviews:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
