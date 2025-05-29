import { useRouter } from "next/navigation";
import { useAuth } from "@/libs/hooks/useAuth";
import { toast } from "sonner";

const ReservationNavLink = () => {
  const router = useRouter();
  const { isAuthenticated, isLoadingAuth } = useAuth();

  const handleClick = () => {
    if (isLoadingAuth) return;

    if (isAuthenticated) {
      router.push("/reservations");
      toast.info(
        "You are already logged in. Redirecting to reservations page."
      );
    } else {
      router.push("/login");
      toast.info("Please log in to make a reservation.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative text-sm text-gray-500 font-sans transition-colors duration-300 ease-in-out hover:text-green-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
    >
      Reservation
    </button>
  );
};

export default ReservationNavLink;
