import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // crea la respuesta JSON
  const res = NextResponse.json({ message: "Logout successful" });

  // elimina la cookie de autenticación
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return res;
}
