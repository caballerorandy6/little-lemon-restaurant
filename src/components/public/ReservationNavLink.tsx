import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/libs/hooks/useAuth";

const ReservationNavLink = () => {
  const router = useRouter();

  const { isAuthenticated, isLoadingAuth } = useAuth({
    redirectOnExpired: false,
  });

  const handleClick = () => {
    if (isLoadingAuth) return;

    if (isAuthenticated) {
      router.push("/reservations");
    } else {
      // Usuario no autenticado: ir al login con mensaje
      router.push("/login");
      toast.info("Please log in to make a reservation.");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoadingAuth}
      className="relative py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:text-green-600 group disabled:opacity-50 disabled:cursor-wait"
    >
      <span className="relative z-10">Reservation</span>
      {/* Animated underline */}
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-green-600 to-yellow-500 transition-all duration-300 group-hover:w-full" />
      {/* Hover background */}
      <span className="absolute inset-0 -z-10 rounded-lg bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
    </button>
  );
};

export default ReservationNavLink;
