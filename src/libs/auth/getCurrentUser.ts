import { cookies } from "next/headers";
import { verifyToken } from "@/libs/auth/verifyToken";
import { prisma } from "@/libs/prisma";
import type { SafeUser } from "@/libs/types";

export async function getCurrentUser(): Promise<SafeUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    include: {
      reservations: true,
      reviews: true,
    },
  });

  if (!user) return null;

  return {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
    reservations: user?.reservations
      ? user.reservations.map((r) => ({
          ...r,
          date: r.date instanceof Date ? r.date.toISOString() : r.date,
          createdAt:
            r.createdAt instanceof Date
              ? r.createdAt.toISOString()
              : r.createdAt,
        }))
      : [],
    reviews: user?.reviews
      ? user.reviews
          .filter((r) => r.mealId !== null)
          .map((r) => ({
            ...r,
            mealId: r.mealId as number,
            createdAt:
              r.createdAt instanceof Date
                ? r.createdAt.toISOString()
                : r.createdAt,
          }))
      : [],
    createdAt: user?.createdAt.toISOString(),
    updatedAt: user?.updatedAt.toISOString(),
  };
}
