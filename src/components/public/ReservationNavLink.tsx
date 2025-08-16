import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/libs/hooks/useAuth";
import clsx from "clsx";

interface ReservationNavLinkProps {
  isLoginPage?: boolean;
}

const ReservationNavLink = ({
  isLoginPage = false,
}: ReservationNavLinkProps) => {
  const router = useRouter();
  const { isAuthenticated, isLoadingAuth } = useAuth({
    redirectOnExpired: false,
  });

  const handleClick = () => {
    if (isLoadingAuth) return;

    if (isAuthenticated) {
      router.push("/#reservation");
    } else {
      router.push("/login");
      toast.info("Please log in to access reservations.", {
        description: "You need an account to make a reservation",
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoadingAuth}
      className={clsx(
        "relative py-2 text-sm font-medium transition-all duration-300 group disabled:opacity-50 disabled:cursor-wait cursor-pointer",
        // Estilos específicos para la página de login
        isLoginPage
          ? ["text-green-600 font-semibold no-underline hover:text-green-700"]
          : [
              // Estilos normales
              "text-gray-700 hover:text-green-600",
            ]
      )}
    >
      <span className="relative z-10 flex items-center gap-1.5">
        Reservation
        {!isLoadingAuth && !isAuthenticated && !isLoginPage && (
          <svg
            className="w-3.5 h-3.5 text-gray-400 group-hover:text-green-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="Login required"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        )}
        {!isLoadingAuth && isAuthenticated && (
          <span
            className="inline-flex items-center justify-center w-2 h-2 bg-green-500 rounded-full animate-pulse"
            aria-label="Available"
          />
        )}
      </span>

      {/* Underline solo cuando NO está en login */}
      {!isLoginPage && (
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-green-600 to-yellow-500 transition-all duration-300 group-hover:w-full" />
      )}

      {/* Hover background */}
      <span
        className={clsx(
          "absolute inset-0 -z-10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center",
          isLoginPage ? "bg-green-100/50" : "bg-green-50/50"
        )}
      />
    </button>
  );
};

export default ReservationNavLink;
