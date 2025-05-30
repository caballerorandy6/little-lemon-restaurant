import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      email: string;
    };

    //Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      message: "Password has been successfully reset.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error resetting password. Please try again." },
      { status: 400 }
    );
  }
}
