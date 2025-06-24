import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/libs/prisma";

// Add item
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = jwt.verify(token.value, process.env.JWT_SECRET!) as {
      id: number;
    };

    const { cart } = await request.json();
    if (!cart || !Array.isArray(cart)) {
      return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
    }

    // Elimina el carrito anterior (si existe)
    await prisma.cartItem.deleteMany({
      where: {
        cart: {
          userId: payload.id,
        },
      },
    });

    // Crea el carrito si no existe
    let userCart = await prisma.cart.findUnique({
      where: { userId: payload.id },
    });

    if (!userCart) {
      userCart = await prisma.cart.create({
        data: {
          userId: payload.id,
        },
      });
    }

    // Guarda los productos del carrito
    for (const item of cart) {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          mealId: item.item.id,
          quantity: item.quantity,
          image: item.image,
        },
      });
    }

    return NextResponse.json({ message: "Cart saved to DB" }, { status: 200 });
  } catch (error) {
    console.error("Error saving cart:", error);
    return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
  }
}

// Fetch the cart for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      console.error("No token found in cookies");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
              select: {
                quantity: true,
                image: true,
                meal: true,
              },
            },
          },
        },
      },
    });

    const cartItems = user?.cart?.items ?? [];

    const transformedCart = cartItems.map((item) => {
      const meal = item.meal;

      return {
        item: {
          ...meal,
          price: 10,
        },
        quantity: item.quantity,
        image: meal.strMealThumb || "",
      };
    });

    //console.log("Fetched cart Route:", transformedCart);

    return NextResponse.json({ cart: transformedCart }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
