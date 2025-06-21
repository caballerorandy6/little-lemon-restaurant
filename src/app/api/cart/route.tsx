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
    const token = request.cookies.get("token");

    // Check if the token exists
    if (!token) {
      console.error("No token found in cookies");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token
    const payload = jwt.verify(token.value, process.env.JWT_SECRET!) as {
      id: number;
    };
    console.log("Decoded payload:", payload);

    // Check if the payload is valid
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Fetch the user and their cart from the database
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: {
        cart: {
          include: {
            items: {
              include: {
                meal: true, // Include meal details in the cart items
              },
            },
          },
        },
      },
    });

    if (!user) {
      console.log("No user found for ID:", payload.id);
      return NextResponse.json({ cart: [] }, { status: 200 });
    }

    if (!user.cart) {
      console.log("User exists but has no cart");
      return NextResponse.json({ cart: [] }, { status: 200 });
    }

    if (user.cart.items.length === 0) {
      console.log("Cart exists but has no items");
      return NextResponse.json({ cart: [] }, { status: 200 });
    }

    console.log("✅ Cart items fetched:", user.cart.items);

    const transformedCart = user.cart.items.map((item) => ({
      item: item.meal,
      quantity: item.quantity,
      image: item.image,
    }));

    return NextResponse.json({ cart: transformedCart }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
