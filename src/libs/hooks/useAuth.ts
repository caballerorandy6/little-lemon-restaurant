import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { useRouter } from "next/navigation";

interface DecodedToken {
  exp: number;
}

export const useAuth = () => {
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

      // if no token, clear everything and redirect to login
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
          setUser(null);
          setIsAuthenticated(false);
          router.push("/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
        router.push("/login");
      } finally {
        setIsLoadingAuth(false);
      }
    };

    authenticate();
  }, [setIsAuthenticated, setIsLoadingAuth, router, setUser]);
  return {
    isAuthenticated,
    isLoadingAuth,
  };
};
