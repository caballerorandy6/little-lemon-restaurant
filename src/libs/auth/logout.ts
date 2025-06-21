import { toast } from "sonner";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { syncCartWithBackend } from "@/libs/utils";

export async function logout() {
  const token = localStorage.getItem("token");
  const { setIsAuthenticated, setUser, emptyCart } =
    useLittleLemonStore.getState();

  if (!token) {
    console.error("No token found in local storage");
    return;
  }

  try {
    await syncCartWithBackend(); // Ensure the cart is synced before logging out

    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      toast.error(`Logout failed: ${response.statusText}`);
    }

    // Clear the token from local storage
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    emptyCart();

    toast.success(`Logout successful ${response.statusText}`);
    window.location.href = "/";
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
