import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { useRouter } from "next/navigation";

interface DecodedToken {
  exp: number;
}

export const useAuth = (options = { redirectOnExpired: true }) => {
  const {
    isLoadingAuth,
    setIsLoadingAuth,
    isAuthenticated,
    setIsAuthenticated,
    setUser,
  } = useLittleLemonStore();

  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      setIsLoadingAuth(true);

      const token = localStorage.getItem("token");

      // if no token, clear everything
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoadingAuth(false);
        sessionStorage.removeItem("cart");
        return;
      }

      try {
        const { exp } = jwtDecode<DecodedToken>(token);
        const now = Math.floor(Date.now() / 1000);

        if (exp < now) {
          // if token is expired
          localStorage.removeItem("token");
          sessionStorage.removeItem("cart");
          setUser(null);
          setIsAuthenticated(false);

          // Only redirect if the option is enabled (for protected routes)
          if (options.redirectOnExpired) {
            router.push("/login");
          }
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        sessionStorage.removeItem("cart");
        setUser(null);
        setIsAuthenticated(false);

        // Only redirect if the option is enabled
        if (options.redirectOnExpired) {
          router.push("/login");
        }
      } finally {
        setIsLoadingAuth(false);
      }
    };

    authenticate();
  }, [
    setIsAuthenticated,
    setIsLoadingAuth,
    router,
    setUser,
    options.redirectOnExpired,
  ]);

  return {
    isAuthenticated,
    isLoadingAuth,
  };
};
