import { Meal, Ingredient } from "@/libs/types";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { CartItem, CategoryAPI, MealAPI, ReservationAPI } from "@/libs/types";

// Function to sort reservations by date and time in descending order
export const sortedReservations = (reservations: ReservationAPI[]) =>
  reservations.sort((a: ReservationAPI, b: ReservationAPI) => {
    const aDateTime = new Date(`${a.date}T${a.time}`);
    const bDateTime = new Date(`${b.date}T${b.time}`);
    return bDateTime.getTime() - aDateTime.getTime();
  });

// Function to check if a reservation is expired
export function isReservationExpired(reservation: ReservationAPI): boolean {
  if (reservation.status !== "ACTIVE") return false;

  const reservationDateTime = new Date(
    `${reservation.date}T${reservation.time}`
  );

  return reservationDateTime < new Date();
}

// Function to check if a reservation is active or expired
export async function autoExpireReservations(reservations: ReservationAPI[]) {
  const now = new Date();

  for (const reservation of reservations) {
    const reservationDateTime = new Date(
      `${reservation.date}T${reservation.time}`
    );

    if (reservationDateTime < now && reservation.status === "ACTIVE") {
      await updateReservationById({
        ...reservation,
        status: "EXPIRED",
      });
    }
  }
}

// Function to format time from 24-hour to 12-hour format
export function formatTimeTo12Hour(time24: string): string {
  const [hourStr, minute] = time24.split(":");
  const hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${period}`;
}

// Date formatter for displaying dates in a user-friendly format
export const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  dateStyle: "medium",
  timeStyle: "short",
});

export const formatDateToDDMMYYYY = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
};

export const getCart = () => useLittleLemonStore.getState().cart;

export const totalItemsCart = () => {
  const cart = getCart();
  return cart.reduce((acc, item: CartItem) => acc + item.quantity, 0);
};

export const quantityItemCart = (itemId: number) => {
  const cart = getCart();
  const item = cart.find((item: CartItem) => item.item.id === itemId);
  return item ? item.quantity : 0;
};

export const subTotal = () => {
  const cart = getCart();
  return cart
    .reduce((acc, product) => acc + product.item.price * product.quantity, 0)
    .toFixed(2);
};

export const taxCalculation = () => (Number(subTotal()) * 0.075).toFixed(2);
export const shippingCalculation = () => (Number(subTotal()) * 0.05).toFixed(2);

export const totalCalculation = () =>
  (
    Number(subTotal()) +
    Number(taxCalculation()) +
    Number(shippingCalculation())
  ).toFixed(2);

// Avatar simulation
export const userNameSimulation = (user: string) => {
  const fullName = user;
  const initials = fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=4ade80&fontColor=ffffff`;
};

// Ingredient parsing
export function parseIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;

    const ingredient = meal[ingredientKey];
    const measure = meal[measureKey];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
  }

  return ingredients;
}

// getCategories function to fetch categories from the API
export async function getCategories(): Promise<CategoryAPI[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

//getMealsByCategory function to fetch meals by category from the API
export async function getMealsByCategory(category: string): Promise<MealAPI[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/meals-by-category/${category}`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meals by category");
    }
    const data = await response.json();
    return data.map((meal: MealAPI) => ({
      ...meal,
      price: meal.price ?? 10, // Default price if not provided
    }));
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    return [];
  }
}

// getSingleMeal function to fetch a single meal by category and name from the API
export async function getSingleMeal(
  category: string,
  name: string,
  baseUrl?: string
): Promise<MealAPI | null> {
  try {
    const resolvedBaseUrl =
      baseUrl ||
      (typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_BASE_URL // SSR fallback
        : window.location.origin); // Client fallback

    const url = `${resolvedBaseUrl}/api/meals-by-category/${category}/${encodeURIComponent(name)}`;

    const response = await fetch(url, {
      next: { revalidate: 60 }, //
    });

    if (!response.ok) {
      throw new Error("Failed to fetch meal");
    }

    const meal = await response.json();
    return {
      ...meal,
      price: meal.price ?? 10,
    };
  } catch (error) {
    console.error("Error fetching single meal:", error);
    return null;
  }
}

//Get All Single User Reservation
export async function getUserReservations(): Promise<ReservationAPI[]> {
  try {
    console.log(
      "Fetching from:",
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations`
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations`,
      {
        next: { revalidate: 60 },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch reservations");
    }

    const data = await response.json();
    console.log("User reservations fetched:", data.reservations);
    return Array.isArray(data.reservations) ? data.reservations : [];
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    return [];
  }
}

//Delete Reservation by ID
export async function deleteReservationById(id: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations?id=${id}`,
      {
        next: { revalidate: 60 },
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete reservation");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return null;
  }
}

//Update Reservation by ID
export async function updateReservationById(data: ReservationAPI) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations`,
      {
        next: { revalidate: 60 },
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Include cookies for authentication
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update reservation");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating reservation:", error);
    return null;
  }
}

//Sincronizar el carrito con el backend
export const syncCartWithBackend = async () => {
  const { isAuthenticated, cart } = useLittleLemonStore.getState();

  if (!isAuthenticated) {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  } else {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
    } catch (err) {
      console.error("Error syncing cart:", err);
    }
  }
};

export const getCartFromDB = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    const data = await response.json();

    return Array.isArray(data.cart) ? data.cart : [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};
