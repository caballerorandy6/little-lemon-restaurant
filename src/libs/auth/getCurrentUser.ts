import { cookies } from "next/headers";
import { verifyToken } from "@/libs/auth/verifyToken";
import { prisma } from "@/libs/prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return user;
}
