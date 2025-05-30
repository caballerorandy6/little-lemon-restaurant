import { NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/libs/zod";
import jwt from "jsonwebtoken";
import { prisma } from "@/libs/prisma";

import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    //Zod validation
    const { email } = forgotPasswordSchema.parse(body);

    //Verifing if the email exists in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    //if the user exists, we generate a JWT token and send the reset password email
    if (user) {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      //URL for the reset password link
      const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

      // Configuring the email transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Reset Your Password",
        text: `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
    }else{
      
    }

    return NextResponse.json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error Request" }, { status: 400 });
  }
}
