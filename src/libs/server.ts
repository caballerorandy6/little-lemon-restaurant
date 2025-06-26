import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/libs/prisma";
import type { CartItem, Ingredient, ReservationAPI } from "@/libs/types";

// Esta función obtiene el carrito del usuario desde el servidor
export async function getCartServerSide(): Promise<CartItem[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      console.warn("No token found in cookies");
      return [];
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: {
        cart: {
          include: {
            items: {
              include: {
                meal: {
                  include: {
                    category: true,
                    reviews: {
                      include: { user: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const cartItems = user?.cart?.items ?? [];

    return cartItems.map((item) => ({
      item: {
        id: item.meal.id,
        strMeal: item.meal.strMeal,
        strMealThumb: item.meal.strMealThumb,
        strInstructions: item.meal.strInstructions,
        strArea: item.meal.strArea,
        strTags: item.meal.strTags,
        strYoutube: item.meal.strYoutube,
        ingredients: (item.meal.ingredients as Ingredient[]) ?? null,
        categoryId: item.meal.categoryId,
        category: {
          id: item.meal.category.id,
          strCategory: item.meal.category.strCategory,
          description: item.meal.category.description,
          thumb: item.meal.category.thumb,
        },
        reviews: item.meal.reviews.map((review) => ({
          id: review.id,
          userId: review.userId,
          mealId: review.mealId,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt.toISOString(),
          user: {
            id: review.user.id,
            name: review.user.name,
            email: review.user.email,
            role: review.user.role,
            createdAt: review.user.createdAt.toISOString(),
            updatedAt: review.user.updatedAt.toISOString(),
          },
          meal: undefined,
        })),
        createdAt: item.meal.createdAt,
        updatedAt: item.meal.updatedAt,
        price: 10,
      },
      quantity: item.quantity,
      image: item.meal.strMealThumb || item.image || "",
    }));
  } catch (error) {
    console.error("getCartServerSide error:", error);
    return [];
  }
}

// Esta función obtiene las reservaciones del usuario desde el servidor
export async function getUserReservationsServerSide(): Promise<
  ReservationAPI[]
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return [];
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: {
        reservations: true,
      },
    });
    return (
      user?.reservations.map((reservation) => ({
        id: reservation.id,
        date: reservation.date.toISOString().split("T")[0],
        time: reservation.time,
        guests: reservation.guests,
        userId: reservation.userId,
        status: reservation.status,
      })) || []
    );
  } catch (error) {
    console.error("getUserReservations error:", error);
    return [];
  }
}

// Esta función actualiza las reservaciones expiradas a "EXPIRED"
export async function updateExpiredReservations() {
  const now = new Date();

  const expiredReservations = await prisma.reservation.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  const expiredIds = expiredReservations
    .filter((res) => {
      const fullDateTime = new Date(
        `${res.date.toISOString().split("T")[0]}T${res.time}`
      );
      return fullDateTime < now;
    })
    .map((res) => res.id);

  if (expiredIds.length > 0) {
    await prisma.reservation.updateMany({
      where: {
        id: { in: expiredIds },
      },
      data: {
        status: "EXPIRED",
      },
    });
  }

  return expiredIds;
}
